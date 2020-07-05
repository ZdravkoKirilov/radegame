import { Component, OnInit, HostBinding } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppState, selectUser } from '@app/core';
import { AutoUnsubscribe, selectGameId } from '@app/shared';
import { ALL_ENTITIES, toGameId, GameId } from '@app/game-mechanics';

import { FetchItemsAction } from '../../state';

@Component({
	selector: 'rg-editor-container',
	templateUrl: './editor.container.html',
	styleUrls: ['./editor.container.scss']
})
@AutoUnsubscribe()
export class EditorContainerComponent implements OnInit {

	@HostBinding('class.block') hostClass = true;

	private data$: Subscription;

	gameId: GameId;

	constructor(private store: Store<AppState>) { }

	ngOnInit() {

		this.data$ = combineLatest(
			this.store.pipe(select(selectUser)),
			this.store.pipe(select(selectGameId))
		).pipe(
			tap(([user, gameId]) => {
				this.gameId = gameId;

				// this.store.dispatch(
				// 	new FetchItemsAction({ key: ALL_ENTITIES.games, data: { gameId: toGameId(gameId) } })
				// );
				// this.store.dispatch(new FetchGameDataAction({ gameId: toGameId(gameId) }));

			})
		).subscribe();
	}
}
