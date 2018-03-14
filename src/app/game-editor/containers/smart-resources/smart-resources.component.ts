import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { Resource, Game } from '../../../game-mechanics';
import {
    ToggleResourceEditorAction,
    DeleteResourceAction,
    ChangeSelectedResourceAction,
    SaveResourceAction
} from '../../state';
import { getSelectedResource } from '../../state';
import { AppState } from '../../../core/state';
import { selectResourceEditorToggleState, selectResources } from '../../state';
import { selectGame } from '../../state';
import { FormDefinition } from '../../../dynamic-forms';
import { RESOURCE_DEF } from '../../forms';

@Component({
    selector: 'rg-smart-resources',
    templateUrl: './smart-resources.component.html',
    styleUrls: ['./smart-resources.component.scss']
})
export class SmartResourcesComponent implements OnInit, OnDestroy {

    private storeSub: Subscription;
    public game: Game;

    public items: Resource[] = [];
    public selectedItem: Resource;
    public showEditor = false;
    public formDefinition: FormDefinition = RESOURCE_DEF;

    constructor(private store: Store<AppState>) {
    }

    saveItem(data: Resource) {
        const payload = {...data, game: this.game.id};
        if (this.selectedItem) {
            payload.id = this.selectedItem.id;
        }
        this.store.dispatch(new SaveResourceAction(payload));
        this.store.dispatch(new ToggleResourceEditorAction(false));
    }

    editItem(payload: Resource) {
        this.changeSelectedItem(payload);
        this.toggleEditor(true);
    }

    removeItem(payload: Resource) {
        this.store.dispatch(new DeleteResourceAction(payload));
    }

    changeSelectedItem(payload: Resource) {
        this.store.dispatch(new ChangeSelectedResourceAction(payload));
    }

    toggleEditor(flag: boolean) {
        if (!flag) {
            this.changeSelectedItem(null);
        }
        this.store.dispatch(new ToggleResourceEditorAction(flag));
    }

    ngOnInit() {
        this.storeSub = this.store.subscribe(state => {
            this.items = selectResources(state);
            this.showEditor = selectResourceEditorToggleState(state);
            this.selectedItem = getSelectedResource(state);
            this.game = selectGame(state);
        });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }

}
