import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { Faction, Game, Resource } from '../../../game-mechanics/models/index';
import { ConnectedEntities } from '../../../dynamic-forms/models/ConnectedEntities';
import { AppState } from '../../../core/state/index';
import {
    selectGame
} from '../../state/reducers/byFeature/assets.reducer';
import {
    SaveFactionAction,
    DeleteFactionAction,
    ChangeSelectedFactionAction,
    ToggleEditorAction
} from '../../state/actions/byFeature/faction.action';
import { FormDefinition } from '../../../dynamic-forms/models/FormDefinition.model';
import { FACTION_DEF } from '../../forms/Faction/faction.form';
import { selectResources } from '../../state/reducers/byFeature/resources.reducer';
import { getSelectedFaction, selectFactionEditorState, selectFactions } from '../../state/reducers/byFeature/factions.reducer';

@Component({
    selector: 'rg-smart-factions',
    templateUrl: './smart-factions.component.html',
    styleUrls: ['./smart-factions.component.scss']
})
export class SmartFactionsComponent implements OnInit, OnDestroy {

    public factions: Faction[];
    public selectedItem: Faction;
    public connectedEntities: ConnectedEntities;
    public showEditor: boolean;
    public game: Game;
    public formDefinition: FormDefinition = FACTION_DEF;

    private storeSub: Subscription;

    constructor(private store: Store<AppState>) {
    }

    saveFaction(data: Faction) {
        const payload = {...data, game: this.game.id};
        if (this.selectedItem) {
            payload.id = this.selectedItem.id;
        }
        this.store.dispatch(new SaveFactionAction(payload));
        this.store.dispatch(new ToggleEditorAction(false));
    }

    removeFaction(payload: Faction) {
        this.store.dispatch(new DeleteFactionAction(payload));
    }

    editFaction(payload: Faction) {
        this.changeSelectedItem(payload);
        this.toggleEditor(true);
    }

    changeSelectedItem(payload: Faction) {
        this.store.dispatch(new ChangeSelectedFactionAction(payload));
    }

    toggleEditor(flag: boolean) {
        if (!flag) {
            this.changeSelectedItem(null);
        }
        this.store.dispatch(new ToggleEditorAction(flag));
    }

    ngOnInit() {
        this.storeSub = this.store.subscribe(state => {
            this.factions = selectFactions(state);
            this.selectedItem = getSelectedFaction(state);
            this.showEditor = selectFactionEditorState(state);
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
