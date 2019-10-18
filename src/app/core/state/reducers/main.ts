import { RouterReducerState } from '@ngrx/router-store';
import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { GameEditorFeature } from '@app/game-editor';
import { RouterStateUrl } from '../../router-custom.serializer';
import { SocialAuthState } from '../../../social-auth';
import { ProfileFeature } from '@app/profile';
import { CatalogFeatureState } from '@app/catalog';
import { CoreFeature, coreReducer } from './core';
import { ArenaState } from '@app/game-arena';

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer,
    core: coreReducer,
};

export interface AppState {
    router?: RouterReducerState<RouterStateUrl>;
    core: CoreFeature;
    editor?: GameEditorFeature;
    profile?: ProfileFeature;
    social_auth?: SocialAuthState;
    catalog?: CatalogFeatureState;
    arena?: ArenaState;
}
