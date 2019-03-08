import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from '@app/core';
import { AutoUnsubscribe, selectGameId } from '@app/shared';
import {
	FetchGame, getSelectedGame, FetchLobbies, FetchAllPlayers, getLobbiesWithPlayers, getFormState, ToggleForm, CreatePlayer
} from '../../state';
import { Game } from '@app/game-mechanics';
import { Lobby, Player } from '../../models';
import { User, selectUser } from '@app/profile';
import { composePlayerName } from '../../utils';

@Component({
	selector: 'rg-lobbies-page',
	template: `
	<rg-game-lobbies 
		[game]="game" 
		[lobbies]="lobbies$ | async" 
		[showForm]="showForm$ | async"
		(createLobby)="showCreateLobbyForm()"
		(joinLobby)="joinLobby($event)"
	>
    </rg-game-lobbies>
    `,
	styles: [`
		:host {
			display: block;
		}
	`]
})
@AutoUnsubscribe()
export class LobbiesPageComponent implements OnInit {

	route$: Subscription;

	game$: Subscription;
	user$: Subscription;
	lobbies$: Observable<Lobby[]>;

	showForm$: Observable<boolean>;

	game: Game;
	user: User;

	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		this.game$ = this.store.pipe(
			select(getSelectedGame),
			map(game => this.game = game)
		).subscribe();
		this.user$ = this.store.pipe(
			select(selectUser),
			map(user => this.user = user)
		).subscribe();


		this.lobbies$ = this.store.pipe(select(getLobbiesWithPlayers));
		this.showForm$ = this.store.pipe(select(getFormState));

		this.route$ = this.store.pipe(
			select(selectGameId),
			map(id => {
				this.store.dispatch(new FetchGame(id));
			}),
		).subscribe();

		this.store.dispatch(new FetchLobbies());
		this.store.dispatch(new FetchAllPlayers());
	}

	showCreateLobbyForm() {
		this.store.dispatch(new ToggleForm(true));
	}

	joinLobby(lobby: Lobby) {
		const player: Player = {
			name: composePlayerName(this.game.title, lobby.name, this.user.alias),
			game: this.game.id,
			user: this.user.id,
			lobby: lobby.name,
		};
		this.store.dispatch(new CreatePlayer(player));
	}

}
