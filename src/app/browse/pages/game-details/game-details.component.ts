import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { map, filter } from 'rxjs/operators';

import { Game, ImageAsset, Setup } from '@app/game-mechanics';
import { AppState } from '@app/core';
import { getGame, FetchGame, FetchImages, getImages, SelectSetup, getSelectedSetup } from '../../state';
import { AutoUnsubscribe, selectGameId, Dictionary } from '@app/shared';

@Component({
	selector: 'rg-game-details-page',
	template: `
	<rg-browse-layout *ngIf="data$ | async as data">
		<rg-game-details [game]="data.game" [images]="data.images" [showForm]="data.selectedSetup" (createLobby)="createLobby($event)"></rg-game-details>
	</rg-browse-layout>
`,
	styles: []
})
@AutoUnsubscribe()
export class GameDetailsPage implements OnInit {

	gameId$: Subscription;
	game$: Observable<Game>;
	images$: Observable<Dictionary<ImageAsset>>;
	selectedSetup$: Observable<number>;
	data$: Observable<{ game: Game, images: Dictionary<ImageAsset>, selectedSetup: number }>

	constructor(private store: Store<AppState>) { }

	ngOnInit() {

		this.data$ = combineLatest(
			this.store.pipe(select(getGame)),
			this.store.pipe(select(getImages)),
			this.store.pipe(select(getSelectedSetup))
		).pipe(
			filter(([game, images]) => {
				return !!game && !!images;
			}),
			map(([game, images, selectedSetup]) => {
				return { game, images, selectedSetup };
			}),
		)

		this.gameId$ = this.store.pipe(
			select(selectGameId),
			filter(gameId => !!gameId),
			map(gameId => {
				this.store.dispatch(new FetchGame(gameId));
				this.store.dispatch(new FetchImages(gameId));
			}),
		).subscribe();
	}

	createLobby(setup: Setup) {
		this.store.dispatch(new SelectSetup(setup.id));
	}

}
