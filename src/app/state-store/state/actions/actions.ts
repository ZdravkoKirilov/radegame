import { actionTypes } from './actionTypes';
import { Action } from '@ngrx/store';

export function showPageLoader(): Action {
    return {
        type: actionTypes.SHOW_PAGE_LOADER,
    };
}