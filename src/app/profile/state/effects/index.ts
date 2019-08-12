import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { AuthService, GetCurrentUserAction } from '@app/core';
import { AuthResponse } from '../../models';
import {
    EmailRegisterAction, EmailRegisterSuccessAction, EmailRegisterFailAction,
    EmailLoginAction, EmailLoginSuccessAction, EmailLoginFailAction, SaveAuthTokenAction,  actionTypes
} from '../actions';
import { AppLocalStorageService } from '@app/shared';

@Injectable()
export class AuthEffectsService {
    constructor(private actions$: Actions, private api: AuthService, private storage: AppLocalStorageService) { }

    @Effect()
    emailRegister: Observable<any> = this.actions$.pipe(
        ofType(actionTypes.EMAIL_REGISTER),
        mergeMap((action: EmailRegisterAction) => {
            return this.api.registerWithEmail(action.payload).pipe(
                mergeMap((res: AuthResponse) => {
                    return [new EmailRegisterSuccessAction(res)];
                }),
                catchError((res: AuthResponse) => {
                    return of(new EmailRegisterFailAction(res));
                })
            );
        }),
    );

    @Effect()
    emailLogin: Observable<any> = this.actions$.pipe(
        ofType(actionTypes.EMAIL_LOGIN),
        mergeMap((action: EmailLoginAction) => {
            return this.api.loginWithEmail(action.payload).pipe(
                mergeMap((res: AuthResponse) => {
                    return [new EmailLoginSuccessAction(res), new SaveAuthTokenAction(res.token)];
                }),
                catchError((res: AuthResponse) => {
                    return of(new EmailLoginFailAction(res));
                }),
            );
        }),
    );

    @Effect()
    saveToken: Observable<any> = this.actions$.pipe(
        ofType(actionTypes.SAVE_AUTH_TOKEN),
        map((action: SaveAuthTokenAction) => {
            this.storage.save('token', action.payload);
            return new GetCurrentUserAction();
        })
    );
}