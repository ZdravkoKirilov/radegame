import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AppState, selectUser } from '@app/core';
import { AutoUnsubscribe, selectLobbyName, selectGameId, OnChange } from '@app/shared';
import {
	FetchLobby, FetchPlayers, getSelectedGame, getSelectedLobbyWithPlayers, FetchGame,
	FetchTeams, FetchFactions, FetchImages, getTeams, getFactions, getImages, getSetup, CreatePlayer, playerJoined, isOwner,
	DeletePlayer, DeleteLobby, getSelf, UpdatePlayer, SendMessage, getMessages,
} from '../../state';
import { Lobby, Player, ChatMessage } from '../../models';
import { Game, Team, Faction, ImageAsset, Setup } from '@app/game-mechanics';
import { User } from '@app/core';
import { composePlayerName } from '../../utils';
import { LiveLobbyService } from '../../services/live-lobbies.service';

@Component({
	selector: 'rg-lobby-page',
	template: `
		<rg-game-lobby 
			[data]="data" 
			(kickPlayer)="kickPlayer($event)"
			(updatePlayer)="updatePlayer($event)"
			(sendMessage)="sendMessage($event)"
		>
		</rg-game-lobby>
    `,
	styles: []
})
@AutoUnsubscribe()
export class LobbyPageComponent implements OnInit, OnDestroy {

	lobbyName$: Subscription;
	gameId$: Subscription;

	data$: Subscription;
	self$: Subscription;

	pendingLeave: boolean;

	constructor(private store: Store<AppState>, private router: Router, private lobbyService: LiveLobbyService) {
	}

	@OnChange(function (value, change) {
		if (!change.currentValue && change.previousValue) {
			const router: Router = this.router;
			this.pendingLeave = true;
			router.navigate(['lobbies', 'games', this.data.game.id]);
		}
	})
	self: Player;

	@OnChange(function (data, c) {
		if (!c.currentValue.lobby && c.previousValue.lobby) {
			const router: Router = this.router;
			this.pendingLeave = true;
			router.navigate(['lobbies', 'games', this.data.game.id]);
		}
	})
	data: {
		lobby: Lobby;
		game: Game;
		user: User;
		teams: Team[];
		factions: Faction[];
		images: ImageAsset[];
		messages: ChatMessage[];
		setup: Setup;
		isOwner: boolean;
	};

	ngOnInit() {

		this.lobbyName$ = this.store.pipe(
			select(selectLobbyName),
			map(lobbyName => {
				this.lobbyService.initLobby(lobbyName);
				this.store.dispatch(new FetchPlayers(lobbyName));
				this.store.dispatch(new FetchLobby(lobbyName));
			})
		).subscribe();

		this.gameId$ = this.store.pipe(
			select(selectGameId),
			map(gameId => {
				if (gameId) {
					this.store.dispatch(new FetchGame(gameId));
					this.store.dispatch(new FetchTeams(gameId));
					this.store.dispatch(new FetchFactions(gameId));
					this.store.dispatch(new FetchImages(gameId));
				}
			})
		).subscribe();

		this.self$ = this.store.pipe(select(getSelf), map(self => this.self = self)).subscribe();

		this.data$ = combineLatest(
			this.store.pipe(select(getSelectedGame)),
			this.store.pipe(select(selectUser)),
			this.store.pipe(select(getSelectedLobbyWithPlayers)),
			this.store.pipe(select(getTeams)),
			this.store.pipe(select(getFactions)),
			this.store.pipe(select(getImages)),
			this.store.pipe(select(getMessages)),
			this.store.pipe(select(getSetup)),
			this.store.pipe(select(isOwner)),
			this.store.pipe(select(playerJoined)),
		).pipe(
			filter(chunk => {
				if (Array.isArray(chunk)) {
					return chunk.every(elem => elem !== null && elem !== undefined);
				} else {
					return chunk !== null && chunk !== undefined;
				}
			}),
			map(([game, user, lobby, teams, factions, images, messages, setup, isOwner, hasJoined]) => {
				this.data = {
					game, user, lobby, teams, factions,
					images, setup, isOwner, messages,
				};
				if (!hasJoined && !this.pendingLeave) {
					this.joinLobby(this.data.lobby);
				}
			})
		).subscribe();
	}

	ngOnDestroy() {
		if (this.data.isOwner) {
			this.destroyLobby();
		} else {
			if (this.self) {
				this.kickPlayer(this.self);
			}
		}
	}

	joinLobby(lobby: Lobby) {
		const player: Player = {
			name: composePlayerName(this.data.game.title, lobby.name, this.data.user.alias),
			game: this.data.game.id,
			user: this.data.user.id,
			lobby: lobby.name,
		};
		this.store.dispatch(new CreatePlayer(player));
	}

	destroyLobby() {
		this.store.dispatch(new DeleteLobby(this.data.lobby.name));
	}

	kickPlayer(player: Player) {
		this.store.dispatch(new DeletePlayer(player.name));
	}

	updatePlayer(player: Partial<Player>) {
		this.store.dispatch(new UpdatePlayer(player));
	}

	sendMessage(message: ChatMessage) {
		this.store.dispatch(new SendMessage(message));
	}

}
