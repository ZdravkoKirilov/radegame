import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../store/index';

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer
};
