import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map, filter } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import clone from 'immer';

import { AppState } from '@app/core';
import {
	getActiveStage, getItems, getEntities, SaveItemAction, DeleteItemAction,
} from '../../state';
import { Stage, Slot, ImageAsset, ALL_ENTITIES } from '@app/game-mechanics';
import { ConnectedEntities } from '@app/dynamic-forms';
import { selectGameId } from '@app/shared';

@Component({
	selector: 'rg-board-container',
	template: `
    <ng-container *ngIf="data$ | async as data">
        <rg-board-editor 
					[stage]="data.stage"
					[slots]="data.slots"
					[entities]="data.entities"
					[gameId]="data.gameId"
					[images]="data.images"
					(saveSlot)="saveSlot($event)"
					(deleteSlot)="deleteSlot($event)"
        ></rg-board-editor>
    </ng-container>
    `,
	styles: []
})
export class BoardContainerComponent {

	constructor(private store: Store<AppState>) { }

	stage: Stage;

	data$: Observable<{
		stage: Stage,
		slots: Slot[],
		entities: ConnectedEntities,
		gameId: number,
		images: ImageAsset[],
	}> = combineLatest<any>(
		this.store.pipe(select(getActiveStage)),
		this.store.pipe(select(getEntities)),
		this.store.pipe(select(selectGameId)),
		this.store.pipe(select(getItems<ImageAsset>(ALL_ENTITIES.images))),
	).pipe(
		filter(data => data.every(elem => !!elem)),
		map(([stage, entities, gameId, images]) => {
			this.stage = stage;
			return {
				stage, entities, gameId, images,
				slots: stage.slots,
			};
		}),
	)

	saveSlot = (slot: Slot) => {
		slot.owner = this.stage.id;
		slot.game = this.stage.game;

		this.store.dispatch(new SaveItemAction({
			key: ALL_ENTITIES.slots,
			data: slot,
		}));
	}

	deleteSlot = (slot: Slot) => {
		slot.owner = this.stage.id;
		slot.game = this.stage.game;

		this.store.dispatch(new DeleteItemAction({
			key: ALL_ENTITIES.slots,
			data: slot,
		}));
	}
}
