import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { mergeMap, map, catchError } from 'rxjs/operators';

import { AuthService, LocalStorageService } from '@app/core';
import { AuthResponse, User } from '../../models';
import {
    EmailRegisterAction, EmailRegisterSuccessAction, EmailRegisterFailAction,
    EmailLoginAction, EmailLoginSuccessAction, EmailLoginFailAction, SaveAuthTokenAction,
    SetCurrentUserAction, GetCurrentUserAction, GetCurrentUserFailAction,
    GetCurrentUserSuccessAction, actionTypes
} from '../actions';

@Injectable()
export class AuthEffectsService {
    constructor(private actions$: Actions, private api: AuthService, private storage: LocalStorageService) { }

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
                    return [new EmailLoginSuccessAction(res), new SaveAuthTokenAction(res.token)];
                }),
                catchError((res: AuthResponse) => {
                    return of(new EmailLoginFailAction(res));
                }),
            );
        }),
    );

    @Effect()
    saveToken: Observable<any> = this.actions$.ofType(actionTypes.SAVE_AUTH_TOKEN).pipe(
        map((action: SaveAuthTokenAction) => {
            this.storage.save('token', action.payload);
            return new GetCurrentUserAction();
        })
    );

    @Effect()
    getCurrentUser: Observable<any> = this.actions$.ofType(actionTypes.GET_CURRENT_USER).pipe(
        mergeMap(() => {
            return this.api.getCurrentUser().pipe(
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
}