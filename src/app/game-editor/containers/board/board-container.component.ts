import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map, filter } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';
import clone from 'immer';

import { AppState } from '@app/core';
import {
	getActiveStage, getItems, getEntities, SaveItemAction,
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
		const index = this.stage.slots.findIndex(childSlot => childSlot.id === slot.id);
		const stage = clone(this.stage, draft => {
			if (index === -1) {
				draft.slots.push(slot);
			} else {
				draft.slots[index] = slot;
			}
		});

		this.store.dispatch(new SaveItemAction({
			key: ALL_ENTITIES.stages,
			data: stage,
		}));
	}

	deleteSlot = (slot: Slot) => {
		const stage = clone(this.stage, draft => {
			draft.slots = draft.slots.filter(childSlot => childSlot.id !== slot.id);
		});
		this.store.dispatch(new SaveItemAction({
			key: ALL_ENTITIES.stages,
			data: stage,
		}));
	}
}
