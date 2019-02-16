import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { Game } from '@app/game-mechanics';
import { AppState } from '@app/core';
import { getGame, FetchGame } from '../../state';
import { AutoUnsubscribe, selectGameId } from '@app/shared';

@Component({
	selector: 'rg-game-details-page',
	template: `
	<rg-browse-layout>
		<rg-game-details [game]="game$ | async">
		</rg-game-details>
	<rg-browse-layout>
`,
	styles: []
})
@AutoUnsubscribe()
export class GameDetailsPage implements OnInit {

	gameId$: Subscription;
	game$: Observable<Game>;

	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		this.game$ = this.store.pipe(
			select(getGame)
		);

		this.gameId$ = this.store.pipe(
			select(selectGameId),
			map(gameId => {
				this.store.dispatch(new FetchGame(gameId));
			}),
		).subscribe();
	}

}
