import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from '@app/core';
import { AutoUnsubscribe, selectGameId } from '@app/shared';
import { FetchGame, getSelectedGame, FetchLobbies, FetchAllPlayers, getLobbies, getPlayers, getLobbiesWithPlayers } from '../../state';
import { Game } from '@app/game-mechanics';
import { Lobby, Player } from '../../models';

@Component({
	selector: 'rg-lobbies-page',
	template: `
    <rg-game-lobbies [game]="game$ | async" [lobbies]="lobbies$ | async" [players]="players$ | async">
    </rg-game-lobbies>
    `,
	styles: []
})
@AutoUnsubscribe()
export class LobbiesPageComponent implements OnInit {

	route$: Subscription;

	game$: Observable<Game>;
	lobbies$: Observable<Lobby[]>;
	players$: Observable<Player[]>;

	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		this.game$ = this.store.pipe(select(getSelectedGame));
		this.lobbies$ = this.store.pipe(select(getLobbiesWithPlayers));
		this.players$ = this.store.pipe(select(getPlayers));

		this.route$ = this.store.pipe(
			select(selectGameId),
			map(id => {
				this.store.dispatch(new FetchGame(id));
			}),
		).subscribe();

		this.store.dispatch(new FetchLobbies());
		this.store.dispatch(new FetchAllPlayers());
	}

}
