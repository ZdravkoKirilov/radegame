import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../../core/state/index';
import { FormDefinition } from '../../../dynamic-forms/models/FormDefinition.model';
import { Activity, Game, Resource } from '../../../game-mechanics/models/index';
import { ACTIVITY_DEF } from '../../forms/activity.form';
import { selectActivities, selectActivityEditorState, getSelectedActivity } from '../../state/reducers/byFeature/activity.reducer';
import { selectGame } from '../../state/reducers/byFeature/assets.reducer';
import { selectResources } from '../../state/reducers/byFeature/resources.reducer';
import {
    SaveActivityAction,
    DeleteActivityAction,
    ToggleActivityEditorAction,
    ChangeSelectedActivityAction
} from '../../state/actions/byFeature/activity.action';

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
    public resources: Resource[];

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
            this.resources = selectResources(state);
        });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }

}
