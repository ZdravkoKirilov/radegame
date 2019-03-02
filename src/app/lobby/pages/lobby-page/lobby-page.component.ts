import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AppState } from '@app/core';
import { AutoUnsubscribe, selectLobbyName, selectGameId } from '@app/shared';
import { FetchLobby, FetchPlayers, getSelectedGame, getSelectedLobbyWithPlayers, FetchGame } from '../../state';
import { Lobby } from '../../models';
import { Game } from '@app/game-mechanics';
import { User, selectUser } from '@app/profile';
import { element } from '@angular/core/src/render3';


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
			})
		).subscribe();


		this.data$ = combineLatest(
			this.store.pipe(select(getSelectedGame)),
			this.store.pipe(select(selectUser)),
			this.store.pipe(select(getSelectedLobbyWithPlayers)),
		).pipe(
			filter(results => results.every(elem => !!elem)),
			map(([game, user, lobby]) => {
				this.data = { game, user, lobby };
			})
		).subscribe();
	}

}
