import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AppState } from '@app/core';
import { AutoUnsubscribe, selectLobbyName, selectGameId } from '@app/shared';
import {
	FetchLobby, FetchPlayers, getSelectedGame, getSelectedLobbyWithPlayers, FetchGame,
	FetchTeams, FetchFactions, FetchImages, getTeams, getFactions, getImages, getSetup,
} from '../../state';
import { Lobby } from '../../models';
import { Game, Team, Faction, ImageAsset, Setup } from '@app/game-mechanics';
import { User, selectUser } from '@app/profile';


@Component({
	selector: 'rg-lobby-page',
	template: `
		<rg-game-lobby [data]="data">
		</rg-game-lobby>
    `,
	styles: []
})
@AutoUnsubscribe()
export class LobbyPageComponent implements OnInit {

	lobbyName$: Subscription;
	gameId$: Subscription;

	data$: Subscription;

	data: {
		lobby: Lobby;
		game: Game;
		user: User;
		teams: Team[];
		factions: Faction[];
		images: ImageAsset[];
		setup: Setup;
	};

	constructor(private store: Store<AppState>) { }

	ngOnInit() {

		this.lobbyName$ = this.store.pipe(
			select(selectLobbyName),
			map(lobbyName => {
				this.store.dispatch(new FetchPlayers(lobbyName));
				this.store.dispatch(new FetchLobby(lobbyName));
			})
		).subscribe();

		this.gameId$ = this.store.pipe(
			select(selectGameId),
			map(gameId => {
				this.store.dispatch(new FetchGame(gameId));
				this.store.dispatch(new FetchTeams(gameId));
				this.store.dispatch(new FetchFactions(gameId));
				this.store.dispatch(new FetchImages(gameId));
			})
		).subscribe();


		this.data$ = combineLatest(
			this.store.pipe(select(getSelectedGame)),
			this.store.pipe(select(selectUser)),
			this.store.pipe(select(getSelectedLobbyWithPlayers)),
			this.store.pipe(select(getTeams)),
			this.store.pipe(select(getFactions)),
			this.store.pipe(select(getImages)),
			this.store.pipe(select(getSetup))
		).pipe(
			filter(chunk => {
				if (Array.isArray(chunk)) {
					return chunk.every(elem => !!elem);
				} else {
					return !!chunk;
				}
			}),
			map(([game, user, lobby, teams, factions, images, setup]) => {
				this.data = { game, user, lobby, teams, factions, images, setup };
			})
		).subscribe();
	}

}
