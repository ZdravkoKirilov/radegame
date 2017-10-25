import * as actionTypes from '../actionTypes';
import {Action} from '@ngrx/store';
import {BoardField} from '../../../../game-mechanics/models/index';


export class SaveFieldAction implements Action {
    constructor(public payload: BoardField) {
    }

    readonly type = actionTypes.SAVE_FIELD;
}

export class SaveFieldSuccessAction implements Action {
    constructor(public payload: BoardField) {
    }

    readonly type = actionTypes.SAVE_FIELD_SUCCESS;
}

export class SaveFieldFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.SAVE_FIELD_FAIL;
}

export class AddGridRowAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.ADD_GRID_ROW;
}

export class AddGridColumnAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.ADD_GRID_COLUMN;
}

export class RemoveGridRowAction implements Action {
    constructor(public payload: number) {
    }

    readonly type = actionTypes.REMOVE_GRID_ROW;
}

export class RemoveGridColumnAction implements Action {
    constructor(public payload: number) {
    }

    readonly type = actionTypes.REMOVE_GRID_COLUMN;
}

export type Actions =
    | SaveFieldAction
    | SaveFieldSuccessAction
    | SaveFieldFailAction
    | AddGridRowAction
    | AddGridColumnAction
    | RemoveGridRowAction
    | RemoveGridColumnAction;
