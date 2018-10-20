import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RouterStateUrl } from '../../router-custom.serializer';
import { ROUTER_PARAMS } from '@app/shared';
import { AppState } from './main';

export const selectRouterFeature = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const selectStageId = createSelector(selectRouterFeature, (routerState): number => {
    return Number(routerState.state.params[ROUTER_PARAMS.STAGE_ID]);
});

export const selectGameId2 = (state: AppState) => {
    return Number(state.router.state.params[ROUTER_PARAMS.GAME_ID]);
};

export const selectGameId = createSelector(
    selectRouterFeature,
    feature => feature.state.params[ROUTER_PARAMS.GAME_ID],
);


