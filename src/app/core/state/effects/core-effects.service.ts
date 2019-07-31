import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable ,  of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { GameEditService, GameFetchService } from '../../services';
import { AppState } from '../reducers';
import { Game } from '@app/game-mechanics';
import { toDictionary } from '@app/shared';
import {
    actionTypes, CoreAction, SetGamesAction,
    GetGamesSuccessAction, GetGamesFailAction
} from '../actions';

@Injectable()
export class CoreEffectsService {

    constructor(
        private actions$: Actions,
        private snackbar: MatSnackBar,
        private api: GameFetchService,
        private store: Store<AppState>) {
    }

    @Effect({ dispatch: false }) showSnackbar: Observable<any> = this.actions$
        .pipe(
            ofType(actionTypes.OPERATION_SUCCESS, actionTypes.OPERATION_FAIL),
            map((action: CoreAction) => {
                const message = action.payload.toString();
                this.snackbar.open(message, '', { duration: 3000 });
            })
        );

    @Effect() getGames: Observable<any> = this.actions$.pipe(
        ofType(actionTypes.GET_GAMES),
        mergeMap(() => {
            return this.api.getGames().pipe(
                mergeMap((res: Game[]) => {
                    const items = toDictionary(res);
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
