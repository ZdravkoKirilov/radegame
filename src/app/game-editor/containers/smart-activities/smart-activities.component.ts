import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../../core/state/index';
import { FormDefinition } from '../../../dynamic-forms/models/FormDefinition.model';
import { Activity, Game } from '../../../game-mechanics/models/index';
import { ACTIVITY_DEF } from '../../forms/activity.form';
import { selectActivities, selectActivityEditorState, getSelectedActivity } from '../../state/reducers/byFeature/activity.reducer';
import {
    SaveActivityAction,
    DeleteActivityAction,
    ToggleEditorAction,
    ChangeSelectedActivityAction,
    SetActivitiesAction
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

    constructor(private store: Store<AppState>) {
    }

    changeSelectedItem(payload: Activity) {
        this.store.dispatch(new ChangeSelectedActivityAction(payload));
    }

    toggleEditor(flag: boolean) {
        if (!flag) {
            this.changeSelectedItem(null);
        }
        this.store.dispatch(new ToggleEditorAction(flag));
    }

    ngOnInit() {
        this.storeSub = this.store.subscribe(state => {

        });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }

}
