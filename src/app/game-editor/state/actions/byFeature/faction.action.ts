import { Action } from '@ngrx/store';
import { Faction, FactionList } from '../../../../game-mechanics/models/index';
import {
    ADD_FACTION,
    CHANGE_SELECTED_FACTION,
    DELETE_FACTION,
    DELETE_FACTION_FAIL,
    DELETE_FACTION_SUCCESS,
    REMOVE_FACTION,
    SAVE_FACTION,
    SAVE_FACTION_FAIL,
    SAVE_FACTION_SUCCESS,
    SET_FACTIONS,
    TOGGLE_FACTION_EDITOR
} from '../../reducers/byFeature/factions.reducer';


export class SaveFactionAction implements Action {
    constructor(public payload: Faction) {
    }

    readonly type = SAVE_FACTION;
}

export class AddFactionAction implements Action {
    constructor(public payload: Faction) {
    }

    readonly type = ADD_FACTION;
}

export class SaveFactionSuccessAction implements Action {
    constructor(public payload: Faction) {
    }

    readonly type = SAVE_FACTION_SUCCESS;
}

export class SaveFactionFailAction implements Action {
    readonly payload = null;
    readonly type = SAVE_FACTION_FAIL;
}

export class SetFactionsAction implements Action {
    constructor(public payload: FactionList) {
    }

    readonly type = SET_FACTIONS;

}

export class ToggleEditorAction implements Action {
    constructor(public payload: boolean) {
    }

    readonly type = TOGGLE_FACTION_EDITOR;
}

export class ChangeSelectedFactionAction implements Action {
    constructor(public payload?: Faction) {
    }

    readonly type = CHANGE_SELECTED_FACTION;
}

export class DeleteFactionAction implements Action {
    constructor(public payload: Faction) {
    }

    readonly type = DELETE_FACTION;
}

export class RemoveFactionAction implements Action {
    constructor(public payload: Faction) {

    }

    readonly type = REMOVE_FACTION;
}

export class DeleteFactionSuccessAction implements Action {
    constructor(public payload: Faction) {
    }

    readonly type = DELETE_FACTION_SUCCESS;
}

export class DeleteFactionFailAction implements Action {
    readonly payload = null;
    readonly type = DELETE_FACTION_FAIL;
}

export type FactionAction =
    | SaveFactionAction
    | SaveFactionSuccessAction
    | SaveFactionFailAction
    | SetFactionsAction
    | ToggleEditorAction
    | ChangeSelectedFactionAction
    | AddFactionAction
    | DeleteFactionAction
    | DeleteFactionSuccessAction
    | DeleteFactionFailAction
    | RemoveFactionAction;
