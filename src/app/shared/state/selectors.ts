import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl, AppState } from '@app/core';
import { ROUTER_PARAMS } from '../config';

export const selectRouterFeature = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const selectGameId = createSelector<AppState, any, number>(
    selectRouterFeature,
    feature => feature.state.params[ROUTER_PARAMS.GAME_ID],
);