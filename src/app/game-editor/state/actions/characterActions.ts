import * as actionTypes from './actionTypes';
import {Action} from '@ngrx/store';
import {Character} from '../../../game-mechanics/models/index';


export class SaveCharacterAction implements Action {
    constructor(public payload: Character) {
    }

    readonly type = actionTypes.SAVE_CHARACTER;
}

export class SaveCharacterSuccessAction implements Action {
    constructor(public payload: Character) {
    }

    readonly type = actionTypes.SAVE_CHARACTER_SUCCESS;
}

export class SaveCharacterFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.SAVE_CHARACTER_FAIL;
}

export type Actions =
    | SaveCharacterAction
    | SaveCharacterSuccessAction
    | SaveCharacterFailAction;
