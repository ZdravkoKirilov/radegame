import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core';
import { combineLatest, Observable } from 'rxjs';
import {
	getActiveStage, getItems, formKeys, getEntities, SaveItemAction,
	DeleteItemAction, selectGameId
} from '../../state';
import { map, filter } from 'rxjs/operators';
import { Stage, Slot, PathEntity, ImageAsset } from '@app/game-mechanics';
import { ConnectedEntities } from '@app/dynamic-forms';

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
		entities: ConnectedEntities
	}> = combineLatest(
		this.store.pipe(select(getActiveStage)),
		this.store.pipe(select(getItems<Slot[]>(formKeys.SLOTS))),
		this.store.pipe(select(getItems<PathEntity[]>(formKeys.PATHS))),
		this.store.pipe(select(getEntities)),
		this.store.pipe(select(selectGameId)),
		this.store.pipe(select(getItems<ImageAsset[]>(formKeys.IMAGES)))
	).pipe(
		filter(data => data.every(elem => !!elem)),
		map(([stage, slots, paths, entities, gameId, images]) => {
			return { stage, slots, paths, entities, gameId, images };
		}),
	)

	savePath = (path: PathEntity) => {
		this.store.dispatch(new SaveItemAction({
			key: formKeys.PATHS,
			data: path,
		}));
	}

	saveSlot = (slot: Slot) => {
		this.store.dispatch(new SaveItemAction({
			key: formKeys.SLOTS,
			data: slot,
		}));
	}

	deletePath = (path: PathEntity) => {
		this.store.dispatch(new DeleteItemAction({
			key: formKeys.PATHS,
			data: path,
		}));
	}

	deleteSlot = (slot: Slot) => {
		this.store.dispatch(new DeleteItemAction({
			key: formKeys.SLOTS,
			data: slot,
		}));
	}

}
