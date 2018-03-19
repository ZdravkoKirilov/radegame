import { RouterReducerState } from '@ngrx/router-store';
import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

import { GameEditorFeature } from '../../../game-editor/';
import { RouterStateUrl } from '../../router-custom.serializer';
import { SocialAuthState } from '../../../social-auth';

export const reducers: ActionReducerMap<AppState> = {
    router: routerReducer
};

export interface AppState {
    router?: RouterReducerState<RouterStateUrl>;
    editor?: GameEditorFeature;
    social_auth?: SocialAuthState;
}
