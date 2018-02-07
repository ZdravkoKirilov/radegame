import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../../core/state/index';
import { FormDefinition } from '../../../dynamic-forms/models/FormDefinition.model';
import { Game, Quest } from '../../../game-mechanics/models/index';
import { ConnectedEntities } from '../../../dynamic-forms/models/ConnectedEntities';
import { QUEST_DEF } from '../../forms/Quest/quest.form';
import { selectQuests, selectQuestEditorState, getSelectedQuest } from '../../state/reducers/byFeature/quest.reducer';
import { selectGame } from '../../state/reducers/byFeature/assets.reducer';
import { selectResources } from '../../state/reducers/byFeature/resources.reducer';
import { selectFieldsAsArray } from '../../state/reducers/byFeature/fields.reducer';
import { selectActivities } from '../../state/reducers/byFeature/activity.reducer';
import { selectRounds } from '../../state/reducers/byFeature/round.reducer';

import {
    SaveQuestAction,
    DeleteQuestAction,
    ToggleQuestEditorAction,
    ChangeSelectedQuestAction
} from '../../state/actions/byFeature/quest.action';

@Component({
    selector: 'rg-smart-quests',
    templateUrl: './smart-quests.component.html',
    styleUrls: ['./smart-quests.component.scss']
})
export class SmartQuestsComponent implements OnInit, OnDestroy {

    private storeSub: Subscription;
    private game: Game;

    public formDefinition: FormDefinition = QUEST_DEF;
    public showEditor: boolean;
    public items: Quest[];
    public selectedItem: Quest;
    public connectedEntities: ConnectedEntities;

    constructor(private store: Store<AppState>) {
    }

    saveItem(data: Quest) {
        const payload = {...data, game: this.game.id};
        this.store.dispatch(new SaveQuestAction(payload));
        this.store.dispatch(new ToggleQuestEditorAction(false));
    }

    removeItem(payload: Quest) {
        this.store.dispatch(new DeleteQuestAction(payload));
    }

    editItem(payload: Quest) {
        this.changeSelectedItem(payload);
        this.toggleEditor(true);
    }

    changeSelectedItem(payload: Quest) {
        this.store.dispatch(new ChangeSelectedQuestAction(payload));
    }

    toggleEditor(flag: boolean) {
        if (!flag) {
            this.changeSelectedItem(null);
        }
        this.store.dispatch(new ToggleQuestEditorAction(flag));
    }

    ngOnInit() {
        this.storeSub = this.store.subscribe(state => {
            this.items = selectQuests(state);
            this.showEditor = selectQuestEditorState(state);
            this.selectedItem = getSelectedQuest(state);
            this.game = selectGame(state);
            this.connectedEntities = {
                resources: selectResources(state),
                fields: selectFieldsAsArray(state),
                activities: selectActivities(state),
                rounds: selectRounds(state),
            };
        });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }

}
