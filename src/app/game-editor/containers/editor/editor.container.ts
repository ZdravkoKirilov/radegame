import { Component, OnInit, HostBinding } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AppState } from '@app/core';
import { FetchItemsAction, FetchGameDataAction } from '../../state';
import { selectUser } from '@app/core';
import { AutoUnsubscribe, selectGameId } from '@app/shared';
import { AllEntity, ALL_ENTITIES } from '@app/game-mechanics';

@Component({
	selector: 'rg-editor-container',
	templateUrl: './editor.container.html',
	styleUrls: ['./editor.container.scss']
})
@AutoUnsubscribe()
export class EditorContainerComponent implements OnInit {

	@HostBinding('class.block') hostClass = true;

	private data$: Subscription;

	gameId: number;

	constructor(private store: Store<AppState>) { }

	ngOnInit() {

		this.data$ = combineLatest(
			this.store.pipe(select(selectUser)),
			this.store.pipe(select(selectGameId))
		).pipe(
			tap(([user, gameId]) => {
				this.gameId = gameId;

				this.store.dispatch(
					new FetchItemsAction({ key: ALL_ENTITIES.games as AllEntity, data: user ? user.id : null })
				);
				this.store.dispatch(new FetchGameDataAction(gameId));

			})
		).subscribe();
	}
}
