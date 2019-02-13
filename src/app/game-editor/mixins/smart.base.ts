import { OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from '@app/core';
import { FormDefinition, ConnectedEntities } from '@app/dynamic-forms';
import { GameEntity } from '@app/game-mechanics';
import {
    SaveItemAction, DeleteItemAction, FormKey, getItems, getEntities, selectGameId, getEditorState, getSelectedEntity, ChangeSelectedItemAction, ToggleEditorAction
} from '../state';
import { AutoUnsubscribe } from '@app/shared';
@AutoUnsubscribe()
export abstract class SmartBase implements OnInit {

    @ViewChild('template') template: TemplateRef<any>;

    abstract key: FormKey;

    gameId$: Subscription;
    formDefinition: FormDefinition;
    showEditor: boolean;
    selectedItem: GameEntity;

    gameId: number;

    connectedEntities$: Observable<ConnectedEntities>;
    items$: Observable<GameEntity[]>;
    showEditor$: Observable<boolean>;
    selectedItem$: Observable<GameEntity>;

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
        this.store.dispatch(new ChangeSelectedItemAction({
            key: this.key,
            data: payload
        }));
    }

    toggleEditor(isVisible: boolean) {
        if (!isVisible) {
            this.changeSelectedItem(null);
        }
        this.store.dispatch(new ToggleEditorAction({
            key: this.key,
            data: isVisible
        }));
    }

    ngOnInit() {
        this.gameId$ = this.store.pipe(
            select(selectGameId),
            map(gameId => { this.gameId = gameId; }),
        ).subscribe();

        this.items$ = this.store.pipe(select(getItems(this.key)));
        this.connectedEntities$ = this.store.pipe(select(getEntities));
        this.showEditor$ = this.store.pipe(select(getEditorState(this.key)));
        this.selectedItem$ = this.store.pipe(select(getSelectedEntity(this.key)));
    }
}