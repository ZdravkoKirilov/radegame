import { RouterState } from '@angular/router';
import { RouterReducerState } from '@ngrx/router-store';

export interface AppState {
    router: RouterReducerState<RouterState>;
}
