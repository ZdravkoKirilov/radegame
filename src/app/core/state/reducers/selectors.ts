import {RouterState} from '@angular/router';
import {RouterReducerState} from '@ngrx/router-store';

import {createFeatureSelector, createSelector} from '@ngrx/store';

export const selectFeature = createFeatureSelector<RouterReducerState<RouterState>>('router');

export const selectRouterParam = function (name): any {
    return createSelector(selectFeature, (routerState) => {
        return routerState.state.root.children[0].params[name];
    });
};
