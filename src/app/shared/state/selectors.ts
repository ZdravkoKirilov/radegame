import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RouterStateUrl, AppState } from '@app/core';
import { ROUTER_PARAMS } from '../config';

export const selectRouterFeature = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

const selectRouterState = createSelector(
    selectRouterFeature,
    feature => feature ? feature.state : null,
);

export const selectGameId = createSelector<AppState, any, number>(
    selectRouterFeature,
    feature => feature.state.params[ROUTER_PARAMS.GAME_ID],
);

export const selectLobbyName = createSelector(
    selectRouterFeature,
    feature => feature.state.params[ROUTER_PARAMS.LOBBY_NAME],
);

export const selectGameInstanceId = createSelector(
    selectRouterFeature,
    feature => feature.state.params[ROUTER_PARAMS.GAME_INSTANCE_ID],
);

export const selectRouteData = createSelector(
    selectRouterState,
    state => state ? state.data : null,
);