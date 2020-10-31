import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { map, filter } from 'rxjs/operators';
import { combineLatest, Observable } from 'rxjs';

import { AppState } from '@app/core';
import {
	getActiveWidget, getItems, getEntities, SaveItemAction, DeleteItemAction,
} from '../../state';
import { Widget, WidgetNode, ImageAsset, STORE_KEYS } from '@app/game-mechanics';
import { ConnectedEntities } from '@app/dynamic-forms';
import { selectGameId } from '@app/shared';

@Component({
	selector: 'rg-board-container',
	template: `
    <ng-container *ngIf="data$ | async as data">
        <rg-board-editor 
					[widget]="data.widget"
					[nodes]="data.nodes"
					[entities]="data.entities"
					[gameId]="data.gameId"
					[images]="data.images"
					(saveNode)="saveNode($event)"
					(deleteNode)="deleteNode($event)"
        ></rg-board-editor>
    </ng-container>
    `,
	styles: []
})
export class BoardContainerComponent {

	constructor(private store: Store<AppState>) { }

	widget: Widget;

	data$: Observable<{
		widget: Widget,
		nodes: WidgetNode[],
		entities: ConnectedEntities,
		gameId: number,
		images: ImageAsset[],
	}> = combineLatest<any>(
		this.store.pipe(select(getActiveWidget)),
		this.store.pipe(select(getEntities)),
		this.store.pipe(select(selectGameId)),
		this.store.pipe(select(getItems<ImageAsset>(STORE_KEYS.images))),
	).pipe(
		filter(data => data.every(elem => !!elem)),
		map(([widget, entities, gameId, images]) => {
			this.widget = widget;
			return {
				widget, entities, gameId, images,
				nodes: widget.nodes,
			};
		}),
	)

	saveNode = (node: WidgetNode) => {
		node.owner = this.widget.id;

		this.store.dispatch(new SaveItemAction({
			key: STORE_KEYS.nodes,
			data: node,
		}));
	}

	deleteNode = (node: WidgetNode) => {
		node.owner = this.widget.id;

		this.store.dispatch(new DeleteItemAction({
			key: STORE_KEYS.nodes,
			data: node,
		}));
	}
}
