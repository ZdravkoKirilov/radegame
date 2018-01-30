import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../../core/state/index';
import { FormDefinition } from '../../../dynamic-forms/models/FormDefinition.model';
import { Game, Round } from '../../../game-mechanics/models/index';
import { ConnectedEntities } from '../../../dynamic-forms/models/ConnectedEntities';
import { ROUND_DEF } from '../../forms/Round/round.form';
import { selectRounds, getSelectedRound, selectRoundEditorState } from '../../state/reducers/byFeature/round.reducer';
import { selectGame } from '../../state/reducers/byFeature/assets.reducer';
import { selectResources } from '../../state/reducers/byFeature/resources.reducer';
import { selectFieldsAsArray } from '../../state/reducers/byFeature/fields.reducer';
import { selectActivities } from '../../state/reducers/byFeature/activity.reducer';
import { selectQuests } from '../../state/reducers/byFeature/quest.reducer';

import {
    SaveRoundAction,
    DeleteRoundAction,
    ToggleRoundEditorAction,
    ChangeSelectedRoundAction
} from '../../state/actions/byFeature/round.action';

@Component({
  selector: 'rg-smart-rounds',
  templateUrl: './smart-rounds.component.html',
  styleUrls: ['./smart-rounds.component.scss']
})
export class SmartRoundsComponent implements OnInit, OnDestroy {

    private storeSub: Subscription;
    private game: Game;

    public formDefinition: FormDefinition = ROUND_DEF;
    public showEditor: boolean;
    public items: Round[];
    public selectedItem: Round;
    public connectedEntities: ConnectedEntities;

    constructor(private store: Store<AppState>) {
    }

    saveItem(data: Round) {
        const payload = {...data, game: this.game.id};
        if (this.selectedItem) {
            payload.id = this.selectedItem.id;
        }
        this.store.dispatch(new SaveRoundAction(payload));
        this.store.dispatch(new ToggleRoundEditorAction(false));
    }

    removeItem(payload: Round) {
        this.store.dispatch(new DeleteRoundAction(payload));
    }

    editItem(payload: Round) {
        this.changeSelectedItem(payload);
        this.toggleEditor(true);
    }

    changeSelectedItem(payload: Round) {
        this.store.dispatch(new ChangeSelectedRoundAction(payload));
    }

    toggleEditor(flag: boolean) {
        if (!flag) {
            this.changeSelectedItem(null);
        }
        this.store.dispatch(new ToggleRoundEditorAction(flag));
    }

    ngOnInit() {
        this.storeSub = this.store.subscribe(state => {
            this.items = selectRounds(state);
            this.showEditor = selectRoundEditorState(state);
            this.selectedItem = getSelectedRound(state);
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
