import { actionTypes } from './actionTypes';
import { Action } from '@ngrx/store';

export class OperationSuccessAction implements Action {
    readonly type = actionTypes.OPERATION_SUCCESS;
    constructor(public payload: string) {}
}

export class OperationFailAction implements Action {
    readonly type = actionTypes.OPERATION_FAIL;
    constructor(public payload: string) {}
}

export type CoreActions = OperationSuccessAction | OperationFailAction;
