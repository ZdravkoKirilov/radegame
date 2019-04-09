import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map, filter } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

import { AppState } from '@app/core';
import {
	getActiveStage, getItems, formKeys, getEntities, SaveItemAction,
	DeleteItemAction,
	FormKey
} from '../../state';
import { Stage, Slot, PathEntity, ImageAsset, GameEntity } from '@app/game-mechanics';
import { ConnectedEntities } from '@app/dynamic-forms';
import { selectGameId } from '@app/shared';

@Component({
	selector: 'rg-board-container',
	template: `
    <ng-container *ngIf="data$ | async as data">
        <rg-board-editor 
			[stage]="data.stage"
			[slots]="data.slots"
			[paths]="data.paths"
			[entities]="data.entities"
			[gameId]="data.gameId"
			[images]="data.images"
			(saveSlot)="saveSlot($event)"
			(savePath)="savePath($event)"
			(deleteSlot)="deleteSlot($event)"
			(deletePath)="deletePath($event)"
        ></rg-board-editor>
    </ng-container>
    `,
	styles: []
})
export class BoardContainerComponent {

	constructor(private store: Store<AppState>) { }

	data$: Observable<{
		stage: Stage,
		slots: Slot[],
		paths: PathEntity[],
		entities: ConnectedEntities,
		gameId: number,
		images: ImageAsset[]
	}> = combineLatest(
		this.store.pipe(select(getActiveStage)),
		this.store.pipe(select(getItems<Slot>(formKeys.slots))),
		this.store.pipe(select(getItems<PathEntity>(formKeys.paths))),
		this.store.pipe(select(getEntities)),
		this.store.pipe(select(selectGameId)),
		this.store.pipe(select(getItems<ImageAsset>(formKeys.images)))
	).pipe(
		filter(data => data.every(elem => !!elem)),
		map(([stage, slots, paths, entities, gameId, images]) => {
			return { stage, slots, paths, entities, gameId, images };
		}),
	)

	savePath = (path: PathEntity) => {
		this.store.dispatch(new SaveItemAction({
			key: formKeys.paths as FormKey,
			data: path as GameEntity,
		}));
	}

	saveSlot = (slot: Slot) => {
		this.store.dispatch(new SaveItemAction({
			key: formKeys.slots as FormKey,
			data: slot as GameEntity,
		}));
	}

	deletePath = (path: PathEntity) => {
		this.store.dispatch(new DeleteItemAction({
			key: formKeys.paths as FormKey,
			data: path as GameEntity,
		}));
	}

	deleteSlot = (slot: Slot) => {
		this.store.dispatch(new DeleteItemAction({
			key: formKeys.slots as FormKey,
			data: slot as GameEntity,
		}));
	}

}
