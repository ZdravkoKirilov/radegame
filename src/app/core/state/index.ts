import { RouterReducerState } from '@ngrx/router-store';

import { GameTemplate } from '../../game-mechanics/models/index';
import { RouterStateUrl } from '../router-custom.serializer';

export interface AppState {
    router?: RouterReducerState<RouterStateUrl>;
    editor?: GameTemplate;
}
