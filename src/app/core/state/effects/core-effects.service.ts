import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { GameEditService } from '../../services';
import { Cache, AppState } from '../reducers';
import { Game } from '../../../game-mechanics';
import { toIndexedList } from '../../../shared';
import {
    actionTypes, CoreAction, GetGamesAction, SetGamesAction,
    GetGamesSuccessAction, GetGamesFailAction
} from '../actions';

@Injectable()
export class CoreEffectsService {

    constructor(
        private actions$: Actions,
        private snackbar: MatSnackBar,
        private api: GameEditService,
        private store: Store<AppState>) {
    }

    @Effect({ dispatch: false }) showSnackbar: Observable<any> = this.actions$
        .ofType(actionTypes.OPERATION_SUCCESS, actionTypes.OPERATION_FAIL).pipe(
            map((action: CoreAction) => {
                const message = action.payload.toString();
                this.snackbar.open(message, '', { duration: 3000 });
            })
        );

    @Effect() getGames: Observable<any> = this.actions$.ofType(actionTypes.GET_GAMES).pipe(
        mergeMap((action: GetGamesAction) => {
            return this.api.getGames().pipe(
                mergeMap((res: Game[]) => {
                    const items = toIndexedList(res);
                    return [new SetGamesAction(items), new GetGamesSuccessAction()];
                }),
                catchError(() => {
                    this.store.dispatch(new SetGamesAction({}));
                    return of(new GetGamesFailAction());
                })
            );
        })
    );
}
