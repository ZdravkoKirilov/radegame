import * as actionTypes from '../actionTypes';
import {Action} from '@ngrx/store';
import {GridFieldPayload} from '../../models/index';
import {BoardField} from '../../../../game-mechanics/models/BoardField';
import {FieldCoord} from '../../../models/FieldCoord';

export class SaveFieldAction implements Action {
    constructor(public payload: GridFieldPayload) {
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

export class AddGridFieldAction implements Action {
    constructor(public payload: GridFieldPayload) {
    }

    readonly type = actionTypes.ADD_GRID_FIELD;
}

export class RemoveGridFieldAction implements Action {
    constructor(public payload: FieldCoord) {
    }

    readonly type = actionTypes.REMOVE_GRID_FIELD;
}

export type Actions =
    | SaveFieldAction
    | SaveFieldSuccessAction
    | SaveFieldFailAction
    | AddGridRowAction
    | AddGridColumnAction
    | RemoveGridRowAction
    | RemoveGridColumnAction
    | AddGridFieldAction
    | RemoveGridFieldAction;
