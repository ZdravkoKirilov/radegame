import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../../core';
import { FormDefinition, ConnectedEntities } from '../../../dynamic-forms';
import { STAGE_DEF } from '../../forms';
import { Game, Stage } from '../../../game-mechanics';
import { SmartBase } from '../../mixins';
import {
    selectStages, getSelectedStage, selectStageEditorState, selectGame,
    selectResources, selectFieldsAsArray, selectActivities, selectQuests
} from '../../state';

import {
    SaveStageAction,
    DeleteStageAction,
    ToggleStageEditorAction,
    ChangeSelectedStageAction,
} from '../../state';

@Component({
    selector: 'rg-smart-stages',
    templateUrl: './smart-stages.component.html',
    styleUrls: ['./smart-stages.component.scss']
})
export class SmartStagesComponent implements OnInit, OnDestroy, SmartBase<Stage> {

    private storeSub: Subscription;
    private game: Game;

    public formDefinition: FormDefinition = STAGE_DEF;
    public showEditor: boolean;
    public items: Stage[];
    public selectedItem: Stage;
    public connectedEntities: ConnectedEntities;

    constructor(private store: Store<AppState>) {
    }

    saveItem(data: Stage) {
        const payload = { ...data, game: this.game.id };
        if (this.selectedItem) {
            payload.id = this.selectedItem.id;
        }
        this.store.dispatch(new SaveStageAction(payload));
        this.store.dispatch(new ToggleStageEditorAction(false));
    }

    removeItem(payload: Stage) {
        this.store.dispatch(new DeleteStageAction(payload));
    }

    editItem(payload: Stage) {
        this.changeSelectedItem(payload);
        this.toggleEditor(true);
    }

    changeSelectedItem(payload: Stage) {
        this.store.dispatch(new ChangeSelectedStageAction(payload));
    }

    toggleEditor(flag: boolean) {
        if (!flag) {
            this.changeSelectedItem(null);
        }
        this.store.dispatch(new ToggleStageEditorAction(flag));
    }

    ngOnInit() {
        this.storeSub = this.store.subscribe(state => {
            this.items = selectStages(state);
            this.showEditor = selectStageEditorState(state);
            this.selectedItem = getSelectedStage(state);
            this.game = selectGame(state);
            this.connectedEntities = {
                resources: selectResources(state),
                fields: selectFieldsAsArray(state),
                activities: selectActivities(state),
                quests: selectQuests(state),
            };
        });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }
}
