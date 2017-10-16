import * as actionTypes from './actionTypes';
import { Action } from '@ngrx/store';
import { Resource } from '../../../game-mechanics/models/Resource';

export class UpdateFieldAction implements Action {
    constructor(public payload: {
        branch: string;
        data: {};
    }) { };
    readonly type = actionTypes.UPDATE_FIELD
}
export class SaveResourceAction implements Action {
    constructor(public payload: Resource) { };
    readonly type = actionTypes.SAVE_RESOURCE;
}
export class SaveResourceSuccessAction implements Action {
    constructor(public payload: Resource) { };
    readonly type = actionTypes.SAVE_RESOURCE_SUCCESS;
}
export class SaveResourceFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.SAVE_RESOURCE_FAIL;
}
export type Actions = UpdateFieldAction | SaveResourceAction | SaveResourceSuccessAction | SaveResourceFailAction;
