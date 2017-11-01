import * as actionTypes from '../actionTypes';
import {Action} from '@ngrx/store';

export class ClearFormAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.CLEAR_FORM;
}

export type FormActions =
    ClearFormAction;
