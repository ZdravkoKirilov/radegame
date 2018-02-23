import { RouterReducerState } from '@ngrx/router-store';

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RouterStateUrl } from '../../router-custom.serializer';
import { ROUTER_PARAMS } from '../../../shared/config/config';

export const selectFeature = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');

export const selectStageId = createSelector(selectFeature, (routerState): number => {
    return Number(routerState.state.params[ROUTER_PARAMS.STAGE_ID]);
});


