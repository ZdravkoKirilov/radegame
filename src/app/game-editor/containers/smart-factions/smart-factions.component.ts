import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { Faction, Game, GameData, Resource } from '../../../game-mechanics/models/index';
import { AppState } from '../../../core/state/index';
import { selectRouterData } from '../../../core/state/reducers/selectors';
import {
    selectFactions,
    getSelectedFaction,
    selectFactionEditorToggleState,
    selectGame,
    selectResources
} from '../../state/reducers/selectors';
import {
    SaveFactionAction,
    SetFactionsAction,
    ChangeSelectedFactionAction,
    ToggleEditorAction
} from '../../state/actions/byFeature/factionActions';
import { FormDefinition, FACTION_DEF } from '../../utils/form-definitions';
import { copyText } from '../../../shared/config/copy-text';

@Component({
    selector: 'rg-smart-factions',
    templateUrl: './smart-factions.component.html',
    styleUrls: ['./smart-factions.component.scss']
})
export class SmartFactionsComponent implements OnInit, OnDestroy {

    public factions: Faction[];
    public selectedItem: Faction;
    public resources: Resource[];
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
    }

    removeFaction(payload: Faction) {
        console.log(payload);
        // TODO: create action
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
            const gameData: GameData = selectRouterData('game')(state);
            if (!this.factions) {
                this.store.dispatch(new SetFactionsAction(gameData.factions));
            }
            this.resources = selectResources(state);
            this.factions = selectFactions(state);
            this.selectedItem = getSelectedFaction(state);
            this.showEditor = selectFactionEditorToggleState(state);
            this.game = selectGame(state);
        });
    }

    ngOnDestroy() {
        this.storeSub.unsubscribe();
    }
}
