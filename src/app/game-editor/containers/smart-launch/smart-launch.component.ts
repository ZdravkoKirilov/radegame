import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { AppState } from '@app/core';
import { Game } from '@app/game-mechanics';
import { FormDefinition } from '@app/dynamic-forms';
import { GAME_DEF } from '../../forms';
import { selectPreloadedGames } from '@app/core';

import { SetItemsAction, SaveItemAction, ChangeSelectedItemAction, formKeys } from '../../state//actions/generics';
import { getItems, getSelectedItem, getEditorState } from '../../state/reducers/generics';
import { SmartBase } from '../../mixins';

@Component({
    selector: 'rg-smart-launch',
    templateUrl: './smart-launch.component.html',
    styleUrls: ['./smart-launch.component.scss']
})
export class SmartLaunchComponent extends SmartBase implements OnInit {

    private hasLoaded = false;

    sub: Subscription;
    readonly key = formKeys.GAMES;

    formDefinition: FormDefinition = GAME_DEF;
    items: Game[];
    selectedItem: Game;
    showEditor = false;

    constructor(public store: Store<AppState>) {
        super(store);
    }

    ngOnInit() {
        this.sub = this.store.subscribe(state => {
            this.items = getItems(this.key)(state.editor.metadata);
            this.selectedItem = getSelectedItem(this.key)(state.editor.metadata);
            this.showEditor = getEditorState(this.key)(state.editor.metadata);
            if (!this.hasLoaded) {
                this.hasLoaded = true;
                const games = selectPreloadedGames(state);
                this.store.dispatch(new ChangeSelectedItemAction({ key: this.key, data: null }));
                this.store.dispatch(new SetItemsAction({ key: this.key, data: games }));
            }
        });

    }

    saveItem(data: Game) {
        const payload = { ...data };
        if (this.selectedItem) {
            payload.id = this.selectedItem.id;
        }
        this.store.dispatch(new SaveItemAction({
            key: this.key,
            data: payload
        }));
        this.toggleEditor(false);
    }
}
