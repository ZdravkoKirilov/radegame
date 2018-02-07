import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AppState } from '../../../core/state/index';
import { FormDefinition } from '../../../dynamic-forms/models/FormDefinition.model';
import { TRIVIA_DEF } from '../../forms/Trivia/trivia.form';
import { Game, Trivia } from '../../../game-mechanics/models/index';
import { ConnectedEntities } from '../../../dynamic-forms/models/ConnectedEntities';
import { selectTrivias, getSelectedTrivia, selectTriviaEditorState } from '../../state/reducers/byFeature/trivia.reducer';
import { selectGame } from '../../state/reducers/byFeature/assets.reducer';
import { selectResources } from '../../state/reducers/byFeature/resources.reducer';
import { selectFieldsAsArray } from '../../state/reducers/byFeature/fields.reducer';
import { selectActivities } from '../../state/reducers/byFeature/activity.reducer';
import { selectQuests } from '../../state/reducers/byFeature/quest.reducer';

import {
    SaveTriviaAction,
    DeleteTriviaAction,
    ToggleTriviaEditorAction,
    ChangeSelectedTriviaAction,
} from '../../state/actions/byFeature/trivia.action';

@Component({
    selector: 'rg-smart-trivia',
    templateUrl: './smart-trivia.component.html',
    styleUrls: ['./smart-trivia.component.scss']
})
export class SmartTriviaComponent implements OnInit, OnDestroy {

    private storeSub: Subscription;
    private game: Game;

    public formDefinition: FormDefinition = TRIVIA_DEF;
    public showEditor: boolean;
    public items: Trivia[];
    public selectedItem: Trivia;
    public connectedEntities: ConnectedEntities;

    constructor(private store: Store<AppState>) {
    }

    saveItem(data: Trivia) {
        const payload = {...data, game: this.game.id};
        if (this.selectedItem) {
            payload.id = this.selectedItem.id;
        }
        this.store.dispatch(new SaveTriviaAction(payload));
        this.store.dispatch(new ToggleTriviaEditorAction(false));
    }

    removeItem(payload: Trivia) {
        this.store.dispatch(new DeleteTriviaAction(payload));
    }

    editItem(payload: Trivia) {
        this.changeSelectedItem(payload);
        this.toggleEditor(true);
    }

    changeSelectedItem(payload: Trivia) {
        this.store.dispatch(new ChangeSelectedTriviaAction(payload));
    }

    toggleEditor(flag: boolean) {
        if (!flag) {
            this.changeSelectedItem(null);
        }
        this.store.dispatch(new ToggleTriviaEditorAction(flag));
    }

    ngOnInit() {
        this.storeSub = this.store.subscribe(state => {
            this.items = selectTrivias(state);
            this.showEditor = selectTriviaEditorState(state);
            this.selectedItem = getSelectedTrivia(state);
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
