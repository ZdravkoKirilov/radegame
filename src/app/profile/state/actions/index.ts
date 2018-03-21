import { Action } from '@ngrx/store';
import { AuthPayload, AuthResponse } from '../../models';

export const actionTypes = {
    EMAIL_REGISTER: 'EMAIL_REGISTER',
    EMAIL_REGISTER_SUCCESS: 'EMAIL_REGISTER_SUCCESS',
    EMAIL_REGISTER_FAIL: 'EMAIL_REGISTER_FAIL',
    EMAIL_LOGIN: 'EMAIL_LOGIN',
    EMAIL_LOGIN_SUCCESS: 'EMAIL_LOGIN_SUCCESS',
    EMAIL_LOGIN_FAIL: 'EMAIL_LOGIN_FAIL'
};

export class EmailRegisterAction implements Action {
    constructor(public payload: AuthPayload) { }
    readonly type = actionTypes.EMAIL_REGISTER;
}

export class EmailRegisterSuccessAction implements Action {
    readonly type = actionTypes.EMAIL_LOGIN_SUCCESS;
    constructor(public payload: AuthResponse) { }
}

export class EmailRegisterFailAction implements Action {
    readonly type = actionTypes.EMAIL_LOGIN_FAIL;
    constructor(public payload: AuthResponse) { }
}

export class EmailLoginAction implements Action {
    readonly type = actionTypes.EMAIL_LOGIN;
    constructor(public payload: AuthPayload) { }
}

export class EmailLoginSuccessAction implements Action {
    readonly type = actionTypes.EMAIL_LOGIN_SUCCESS;
    constructor(public payload: AuthResponse) { }
}

export class EmailLoginFailAction implements Action {
    readonly type = actionTypes.EMAIL_LOGIN_FAIL;
    constructor(public payload: AuthResponse) { }
}

export type ProfileAction = EmailLoginAction | EmailLoginSuccessAction | EmailLoginFailAction |
    EmailRegisterAction | EmailRegisterSuccessAction | EmailRegisterFailAction;

