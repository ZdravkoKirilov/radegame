import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { mergeMap, catchError } from 'rxjs/operators';

import { AuthService } from '../../../core';
import { AuthPayload, AuthResponse } from '../../models';
import {
    EmailRegisterAction, EmailRegisterSuccessAction, EmailRegisterFailAction,
    EmailLoginAction, EmailLoginSuccessAction, EmailLoginFailAction, actionTypes
} from '../actions';

@Injectable()
export class AuthEffectsService {
    constructor(private actions$: Actions, private api: AuthService) { }

    @Effect()
    emailRegister: Observable<any> = this.actions$.ofType(actionTypes.EMAIL_REGISTER).pipe(
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
    emailLogin: Observable<any> = this.actions$.ofType(actionTypes.EMAIL_LOGIN).pipe(
        mergeMap((action: EmailLoginAction) => {
            return this.api.loginWithEmail(action.payload).pipe(
                mergeMap((res: AuthResponse) => {
                    return [new EmailLoginSuccessAction(res)];
                }),
                catchError((res: AuthResponse) => {
                    return of(new EmailLoginFailAction(res));
                }),
            );
        }),
    );
}