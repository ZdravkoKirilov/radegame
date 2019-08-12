import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../services';
import {
    actionTypes, CoreAction, GetCurrentUserSuccessAction, SetCurrentUserAction, GetCurrentUserFailAction
} from '../actions';
import { AppLocalStorageService } from '@app/shared';
import { User } from '@app/core';

@Injectable()
export class CoreEffectsService {

    constructor(
        private actions$: Actions,
        private snackbar: MatSnackBar,
        private auth: AuthService,
        private storage: AppLocalStorageService
    ) {
    }

    @Effect({ dispatch: false }) showSnackbar: Observable<any> = this.actions$
        .pipe(
            ofType(actionTypes.OPERATION_SUCCESS, actionTypes.OPERATION_FAIL),
            map((action: CoreAction) => {
                const message = action.payload.toString();
                this.snackbar.open(message, '', { duration: 3000 });
            })
        );

    @Effect()
    getCurrentUser: Observable<any> = this.actions$.pipe(
        ofType(actionTypes.GET_CURRENT_USER),
        mergeMap(() => {
            return this.auth.getCurrentUser().pipe(
                mergeMap((user: User) => {
                    return [
                        new GetCurrentUserSuccessAction(user),
                        new SetCurrentUserAction(user)
                    ]
                }),
                catchError(() => {
                    return of(new GetCurrentUserFailAction());
                })
            )
        })
    );

    @Effect({ dispatch: false })
    logout: Observable<any> = this.actions$.pipe(
        ofType(actionTypes.LOGOUT),
        map(() => {
            this.storage.remove('token');
        })
    );
}
