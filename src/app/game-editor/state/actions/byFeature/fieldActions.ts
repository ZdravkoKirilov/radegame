import * as actionTypes from '../actionTypes';
import { Action } from '@ngrx/store';
import { BoardField, MapLocation } from '../../../../game-mechanics/models/index';

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

export class DeleteFieldAction implements Action {
    constructor(public payload: BoardField) {
    }

    readonly type = actionTypes.DELETE_FIELD;
}

export class DeleteFieldSuccessAction implements Action {
    constructor(public payload: BoardField) {
    }

    readonly type = actionTypes.DELETE_FIELD_SUCCESS;
}

export class DeleteFieldFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.DELETE_FIELD_FAIL;
}

export class GetFieldsAction implements Action {
    constructor(public payload: { gameId: number }) {
    }

    readonly type = actionTypes.GET_FIELDS;
}

export class GetFieldsSuccessAction implements Action {
    constructor(public payload: BoardField[]) {
    }

    readonly type = actionTypes.GET_FIELDS_SUCCESS;
}

export class GetFieldsFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.GET_FIELDS_FAIL;
}

export class ToggleFieldEditorAction implements Action {
    constructor(public payload: boolean) {
    }

    readonly type = actionTypes.TOGGLE_FIELD_EDITOR;
}

export class ChangeSelectedFieldAction implements Action {
    constructor(public payload: number) {
    }

    readonly type = actionTypes.CHANGE_SELECTED_FIELD;
}

export type Actions =
    | SaveFieldAction
    | SaveFieldSuccessAction
    | SaveFieldFailAction
    | DeleteFieldAction
    | DeleteFieldSuccessAction
    | DeleteFieldFailAction
    | GetFieldsAction
    | GetFieldsSuccessAction
    | GetFieldsFailAction
    | ToggleFieldEditorAction
    | ChangeSelectedFieldAction;
