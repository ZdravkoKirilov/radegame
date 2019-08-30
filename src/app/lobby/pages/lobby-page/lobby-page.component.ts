import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AppState, selectUser, getLatestActiveGame, ActiveGame } from '@app/core';
import { AutoUnsubscribe, selectLobbyName, selectGameId, OnChange } from '@app/shared';
import {
	FetchLobby, FetchPlayers, getSelectedGame, getSelectedLobbyWithPlayers, FetchGame,
	FetchTeams, FetchFactions, FetchImages, getTeams, getFactions, getImages, getSetup, CreatePlayer, playerJoined, isOwner,
	DeletePlayer, DeleteLobby, getSelf, UpdatePlayer, SendMessage, getMessages, FetchSetups, CreateGame,
} from '../../state';
import { Lobby, LobbyPlayer, ChatMessage } from '../../models';
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
			(startGame)="startGame($event)"
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
	activeGame$: Subscription;

	pendingLeave: boolean;
	activeGame: ActiveGame;

	constructor(private store: Store<AppState>, private router: Router, private lobbyService: LiveLobbyService) {
	}

	@OnChange(function (value, change) {
		if (!change.currentValue && change.previousValue && !this.activeGame) {
			const router: Router = this.router;
			this.pendingLeave = true;
			router.navigate(['lobby', 'games', this.data.game.id]);
		}
	})
	self: LobbyPlayer;

	@OnChange(function (data, c) {
		if (!c.currentValue.lobby && c.previousValue.lobby && !this.activeGame) {
			const router: Router = this.router;
			this.pendingLeave = true;
			router.navigate(['lobby', 'games', this.data.game.id]);
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

		this.activeGame$ = this.store.pipe(
			select(getLatestActiveGame),
			filter<ActiveGame>(Boolean),
			map(game => {
				this.activeGame = game;
				const router: Router = this.router;
				router.navigate(['arena', game.instanceId]);
			})
		).subscribe();

		this.lobbyName$ = this.store.pipe(
			select(selectLobbyName),
			filter<string>(Boolean),
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
					this.store.dispatch(new FetchSetups(gameId));
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
		const player: LobbyPlayer = {
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

	kickPlayer(player: LobbyPlayer) {
		this.store.dispatch(new DeletePlayer(player.name));
	}

	updatePlayer(player: Partial<LobbyPlayer>) {
		this.store.dispatch(new UpdatePlayer(player));
	}

	sendMessage(message: ChatMessage) {
		this.store.dispatch(new SendMessage(message));
	}

	startGame() {
		const game_id = this.data.game.id;
		const players = this.data.lobby.players.map(player => {
			return {
				...player,
				team: player.team || null,
				color: player.color || null,
				faction: player.faction || null,
			};
		});
		const lobbyName = this.data.lobby.name;
		this.store.dispatch(new CreateGame({ game_id, players, lobbyName }));
	}

}
