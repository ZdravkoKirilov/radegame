import { OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../core';
import { FormDefinition, ConnectedEntities } from '../../dynamic-forms';
import { GameEntity, Game } from '../../game-mechanics';
import {
    SaveItemAction, DeleteItemAction, ToggleEditorAction,
    ChangeSelectedItemAction, FormKey, GenericActionPayload
} from '../state//actions/generics';
import { selectGame } from '../state';
import { getSelectedItem, getItems, getEditorState, getEntities } from '../state//reducers/generics';

export abstract class SmartBase implements OnInit, OnDestroy {

    public sub: Subscription;
    public formDefinition: FormDefinition;
    public showEditor: boolean;
    public items: GameEntity[];
    public selectedItem: GameEntity;
    public connectedEntities?: ConnectedEntities;
    public game: Game;

    abstract key: FormKey;

    constructor(public store: Store<AppState>) { }

    saveItem(data: GameEntity) {
        const payload = { ...data, game: this.game.id };
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
    toggleEditor(flag: boolean) {
        if (!flag) {
            this.changeSelectedItem(null);
        }
        this.store.dispatch(new ToggleEditorAction({
            key: this.key,
            data: flag
        }));
    }

    ngOnInit() {
        this.sub = this.store.subscribe(state => {
            this.game = selectGame(state);
            this.items = getItems(this.key, this.game.id)(state.editor.form);
            this.selectedItem = getSelectedItem(this.key)(state.editor.form);
            this.showEditor = getEditorState(this.key)(state.editor.form);
            this.connectedEntities = getEntities(state.editor.form);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}