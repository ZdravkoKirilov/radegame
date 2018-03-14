import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { AppState } from '../../../core';
import { Game } from '../../../game-mechanics';
import { Option, FormDefinition } from '../../../dynamic-forms';
import { GAME_DEF } from '../../forms';
import { CreateGameAction, ChangeSelectedGameAction, ToggleGameEditorAction, DeleteGameAction } from '../../state';
import { selectGames, selectGameEditorToggleState, getSelectedGame } from '../../state';

@Component({
    selector: 'rg-smart-launch',
    templateUrl: './smart-launch.component.html',
    styleUrls: ['./smart-launch.component.scss']
})
export class SmartLaunchComponent implements OnInit, OnDestroy {

    private storeSub: Subscription;

    formDefinition: FormDefinition = GAME_DEF;
    items: Game[];
    selectedItem: Game;
    showEditor = false;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {

        this.storeSub = this.store.subscribe((state: AppState) => {
            this.items = selectGames(state);
            this.selectedItem = getSelectedGame(state);
            this.showEditor = selectGameEditorToggleState(state);
        });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }

    changeSelectedItem(payload: Game) {
        this.store.dispatch(new ChangeSelectedGameAction(payload));
    }

    toggleEditor(flag: boolean) {
        if (!flag) {
            this.changeSelectedItem(null);
        }
        this.store.dispatch(new ToggleGameEditorAction(flag));
    }

    saveItem(data: Game) {
        const payload = { ...data };
        if (this.selectedItem) {
            payload.id = this.selectedItem.id;
        }
        this.store.dispatch(new CreateGameAction(payload));
        this.store.dispatch(new ToggleGameEditorAction(false));
    }

    editItem(payload: Game) {
        this.changeSelectedItem(payload);
        this.toggleEditor(true);
    }

    removeItem(payload: Game) {
        this.store.dispatch(new DeleteGameAction(payload));
    }

}
