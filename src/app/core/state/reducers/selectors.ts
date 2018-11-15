import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

import { RouterStateUrl } from '../../router-custom.serializer';

export const selectRouterFeature = createFeatureSelector<RouterReducerState<RouterStateUrl>>('router');


