import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { AppState } from '../../../core';
import { Game } from '../../../game-mechanics';
import { FormDefinition } from '../../../dynamic-forms';
import { GAME_DEF } from '../../forms';
import { selectPreloadedGames } from '../../../core';

import { SetItemsAction, SaveItemAction } from '../../state//actions/generics';
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
    readonly key = 'games';

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
                this.store.dispatch(new SetItemsAction({
                    key: this.key,
                    data: games
                }));
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

    // ngOnDestroy() {
    //     this.subs.forEach(elem => elem.unsubscribe());
    // }

    // changeSelectedItem(payload: Game) {
    //     this.store.dispatch(new ChangeSelectedGameAction(payload));
    // }

    // toggleEditor(flag: boolean) {
    //     if (!flag) {
    //         this.changeSelectedItem(null);
    //     }
    //     this.store.dispatch(new ToggleGameEditorAction(flag));
    // }

    // editItem(payload: Game) {
    //     this.changeSelectedItem(payload);
    //     this.toggleEditor(true);
    // }

    // removeItem(payload: Game) {
    //     this.store.dispatch(new DeleteGameAction(payload));
    // }

}
