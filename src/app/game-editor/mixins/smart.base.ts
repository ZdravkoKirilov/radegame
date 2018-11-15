import { OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from '@app/core';
import { FormDefinition, ConnectedEntities } from '@app/dynamic-forms';
import { GameEntity } from '@app/game-mechanics';
import {
    SaveItemAction, DeleteItemAction, FormKey, getItems, getEntities, selectGameId
} from '../state';

export abstract class SmartBase implements OnInit, OnDestroy {

    @ViewChild('template') template: TemplateRef<any>;

    abstract key: FormKey;

    public sub: Subscription;
    public formDefinition: FormDefinition;
    public showEditor: boolean;
    public selectedItem: GameEntity;

    public gameId: number;

    public connectedEntities$: Observable<ConnectedEntities>;
    public items$: Observable<GameEntity[]>;


    constructor(public store: Store<AppState>) { }

    saveItem(data: GameEntity) {
        const payload = { ...data, game: this.gameId };
        if (this.selectedItem) {
            payload.id = this.selectedItem.id;
        }
        this.store.dispatch(new SaveItemAction({
            key: this.key,
            data: payload
        }));
        this.toggleEditor(false);
    }

    removeItem(payload: GameEntity) {
        this.store.dispatch(new DeleteItemAction({
            key: this.key,
            data: payload
        }));
    }

    editItem(payload: GameEntity) {
        this.changeSelectedItem(payload);
        this.toggleEditor(true);
    }

    changeSelectedItem(payload: GameEntity) {
        this.selectedItem = payload;
    }

    toggleEditor(isVisible: boolean) {
        if (!isVisible) {
            this.changeSelectedItem(null);
        }
        this.showEditor = isVisible;
    }

    ngOnInit() {
        this.sub = this.store.pipe(
            select(selectGameId),
            map(gameId => { this.gameId = gameId; }),
        ).subscribe();

        this.items$ = this.store.pipe(select(getItems(this.key)));
        this.connectedEntities$ = this.store.pipe(select(getEntities));
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}