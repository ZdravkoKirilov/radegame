import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../../core';
import { FormDefinition, ConnectedEntities } from '../../../dynamic-forms';
import { Activity, Game } from '../../../game-mechanics';
import { ACTIVITY_DEF } from '../../forms';
import { selectActivities, selectActivityEditorState, getSelectedActivity, selectGame, selectResources } from '../../state';
import {
    SaveActivityAction,
    DeleteActivityAction,
    ToggleActivityEditorAction,
    ChangeSelectedActivityAction
} from '../../state';

@Component({
    selector: 'rg-smart-activities',
    templateUrl: './smart-activities.component.html',
    styleUrls: ['./smart-activities.component.scss']
})
export class SmartActivitiesComponent implements OnInit, OnDestroy {

    private storeSub: Subscription;
    private game: Game;

    public formDefinition: FormDefinition = ACTIVITY_DEF;
    public showEditor: boolean;
    public items: Activity[];
    public selectedItem: Activity;
    public connectedEntities: ConnectedEntities;

    constructor(private store: Store<AppState>) {
    }

    saveItem(data: Activity) {
        const payload = {...data, game: this.game.id};
        if (this.selectedItem) {
            payload.id = this.selectedItem.id;
        }
        this.store.dispatch(new SaveActivityAction(payload));
        this.store.dispatch(new ToggleActivityEditorAction(false));
    }

    removeItem(payload: Activity) {
        this.store.dispatch(new DeleteActivityAction(payload));
    }

    editItem(payload: Activity) {
        this.changeSelectedItem(payload);
        this.toggleEditor(true);
    }

    changeSelectedItem(payload: Activity) {
        this.store.dispatch(new ChangeSelectedActivityAction(payload));
    }

    toggleEditor(flag: boolean) {
        if (!flag) {
            this.changeSelectedItem(null);
        }
        this.store.dispatch(new ToggleActivityEditorAction(flag));
    }

    ngOnInit() {
        this.storeSub = this.store.subscribe(state => {
            this.items = selectActivities(state);
            this.showEditor = selectActivityEditorState(state);
            this.selectedItem = getSelectedActivity(state);
            this.game = selectGame(state);
            this.connectedEntities = {
                resources: selectResources(state),
            };
        });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }

}
