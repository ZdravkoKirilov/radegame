import * as actionTypes from '../actionTypes';
import { Action } from '@ngrx/store';
import { Faction, FactionList } from '../../../../game-mechanics/models/index';


export class SaveFactionAction implements Action {
    constructor(public payload: Faction) {
    }

    readonly type = actionTypes.SAVE_FACTION;
}

export class SaveFactionSuccessAction implements Action {
    constructor(public payload: Faction) {
    }

    readonly type = actionTypes.SAVE_FACTION_SUCCESS;
}

export class SaveFactionFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.SAVE_FACTION_FAIL;
}

export class SetFactionsAction implements Action {
    constructor(public payload: FactionList) {
    }

    readonly type = actionTypes.SET_FACTIONS;

}

export class ToggleEditorAction implements Action {
    constructor(public payload: boolean) {
    }

    readonly type = actionTypes.TOGGLE_FACTION_EDITOR;
}

export class ChangeSelectedFactionAction implements Action {
    constructor(public payload?: Faction) {
    }

    readonly type = actionTypes.CHANGE_SELECTED_FACTION;
}

export type Actions =
    | SaveFactionAction
    | SaveFactionSuccessAction
    | SaveFactionFailAction
    | SetFactionsAction
    | ToggleEditorAction
    | ChangeSelectedFactionAction;
