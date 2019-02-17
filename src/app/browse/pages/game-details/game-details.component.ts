import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { map, filter } from 'rxjs/operators';

import { Game, ImageAsset } from '@app/game-mechanics';
import { AppState } from '@app/core';
import { getGame, FetchGame, FetchImages, getImages } from '../../state';
import { AutoUnsubscribe, selectGameId, Dictionary } from '@app/shared';

@Component({
	selector: 'rg-game-details-page',
	template: `
	<rg-browse-layout>
		<rg-game-details [game]="game$ | async" [images]="images$ | async"></rg-game-details>
	</rg-browse-layout>
`,
	styles: []
})
@AutoUnsubscribe()
export class GameDetailsPage implements OnInit {

	gameId$: Subscription;
	game$: Observable<Game>;
	images$: Observable<Dictionary<ImageAsset>>;

	constructor(private store: Store<AppState>) { }

	ngOnInit() {
		this.game$ = this.store.pipe(select(getGame));
		this.images$ = this.store.pipe(select(getImages);

		this.gameId$ = this.store.pipe(
			select(selectGameId),
			filter(gameId => !!gameId),
			map(gameId => {
				this.store.dispatch(new FetchGame(gameId));
				this.store.dispatch(new FetchImages(gameId));
			}),
		).subscribe();
	}

}
