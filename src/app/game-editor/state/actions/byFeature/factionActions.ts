import * as actionTypes from '../actionTypes';
import { Action } from '@ngrx/store';
import { Faction } from '../../../../game-mechanics/models/index';


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

export type Actions =
    | SaveFactionAction
    | SaveFactionSuccessAction
    | SaveFactionFailAction;
