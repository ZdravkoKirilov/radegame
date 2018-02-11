import { Action } from '@ngrx/store';
import { Field, FieldList } from '../../../../game-mechanics/models/index';
import {
    CHANGE_SELECTED_FIELD,
    DELETE_FIELD,
    DELETE_FIELD_FAIL,
    DELETE_FIELD_SUCCESS,
    GET_FIELDS,
    GET_FIELDS_FAIL,
    GET_FIELDS_SUCCESS,
    SAVE_FIELD,
    SAVE_FIELD_FAIL,
    SAVE_FIELD_SUCCESS, SET_FIELDS,
    TOGGLE_FIELD_EDITOR
} from '../../reducers/byFeature/fields.reducer';

export class SaveFieldAction implements Action {
    constructor(public payload: Field) {
    }

    readonly type = SAVE_FIELD;
}

export class SaveFieldSuccessAction implements Action {
    constructor(public payload: Field) {
    }

    readonly type = SAVE_FIELD_SUCCESS;
}

export class SaveFieldFailAction implements Action {
    readonly payload = null;
    readonly type = SAVE_FIELD_FAIL;
}

export class DeleteFieldAction implements Action {
    constructor(public payload: Field) {
    }

    readonly type = DELETE_FIELD;
}

export class DeleteFieldSuccessAction implements Action {
    constructor(public payload: Field) {
    }

    readonly type = DELETE_FIELD_SUCCESS;
}

export class DeleteFieldFailAction implements Action {
    readonly payload = null;
    readonly type = DELETE_FIELD_FAIL;
}

export class GetFieldsAction implements Action {
    constructor(public payload: number) {
    }

    readonly type = GET_FIELDS;
}

export class GetFieldsSuccessAction implements Action {
    readonly payload = null;
    readonly type = GET_FIELDS_SUCCESS;
}

export class GetFieldsFailAction implements Action {
    readonly payload = null;
    readonly type = GET_FIELDS_FAIL;
}

export class SetFieldsAction implements Action {
    constructor(public payload: FieldList) {
    }

    readonly type = SET_FIELDS;
}

export class ToggleFieldEditorAction implements Action {
    constructor(public payload: boolean) {
    }

    readonly type = TOGGLE_FIELD_EDITOR;
}

export class ChangeSelectedFieldAction implements Action {
    constructor(public payload: Field) {
    }

    readonly type = CHANGE_SELECTED_FIELD;
}

export type FieldAction =
    | SaveFieldAction
    | SaveFieldSuccessAction
    | SaveFieldFailAction
    | DeleteFieldAction
    | DeleteFieldSuccessAction
    | DeleteFieldFailAction
    | GetFieldsAction
    | GetFieldsSuccessAction
    | GetFieldsFailAction
    | SetFieldsAction
    | ToggleFieldEditorAction
    | ChangeSelectedFieldAction;
