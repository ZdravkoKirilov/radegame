import { RouterReducerState } from '@ngrx/router-store';
import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { cacheReducer } from './cache.reducer';

import { GameEditorFeature } from '../../../game-editor/';
import { RouterStateUrl } from '../../router-custom.serializer';
import { SocialAuthState } from '../../../social-auth';
import { ProfileFeature } from '../../../profile';

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    cache: cacheReducer,
};

export interface AppState {
    cache?: any;
    router?: RouterReducerState<RouterStateUrl>;
    editor?: GameEditorFeature;
    profile?: ProfileFeature;
    social_auth?: SocialAuthState;
}
