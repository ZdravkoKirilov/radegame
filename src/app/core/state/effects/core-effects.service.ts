import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable ,  of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { GameEditService, GameFetchService } from '../../services';
import { AppState } from '../reducers';
import { Game } from '@app/game-mechanics';
import { toIndexedList } from '@app/shared';
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
        .ofType(actionTypes.OPERATION_SUCCESS, actionTypes.OPERATION_FAIL).pipe(
            map((action: CoreAction) => {
                const message = action.payload.toString();
                this.snackbar.open(message, '', { duration: 3000 });
            })
        );

    @Effect() getGames: Observable<any> = this.actions$.ofType(actionTypes.GET_GAMES).pipe(
        mergeMap(() => {
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
