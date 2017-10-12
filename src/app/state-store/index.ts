import { RouterState } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';

import { GameTemplate } from '../game-mechanics/models/GameTemplate';

export interface AppState {
    router?: RouterReducerState<RouterState>;
    editor?: {
        form: GameTemplate
    };
}
