import { Action } from '@ngrx/store';
import { AuthPayload, AuthResponse, User } from '../../models';

export const actionTypes = {
    EMAIL_REGISTER: 'EMAIL_REGISTER',
    EMAIL_REGISTER_SUCCESS: 'EMAIL_REGISTER_SUCCESS',
    EMAIL_REGISTER_FAIL: 'EMAIL_REGISTER_FAIL',
    EMAIL_LOGIN: 'EMAIL_LOGIN',
    EMAIL_LOGIN_SUCCESS: 'EMAIL_LOGIN_SUCCESS',
    EMAIL_LOGIN_FAIL: 'EMAIL_LOGIN_FAIL',
    SAVE_AUTH_TOKEN: 'SAVE_AUTH_TOKEN',
    GET_CURRENT_USER: 'GET_CURRENT_USER',
    SET_CURRENT_USER: 'SET_CURRENT_USER',
    GET_CURRENT_USER_SUCCESS: 'GET_CURRENT_USER_SUCCESS',
    GET_CURRENT_USER_FAIL: 'GET_CURRENT_USER_FAIL',

    LOGOUT: 'LOGOUT',
};

export class LogoutAction implements Action {
    readonly type = actionTypes.LOGOUT;
    readonly payload = null;
}

export class GetCurrentUserAction implements Action {
    readonly type = actionTypes.GET_CURRENT_USER;
    readonly payload = null;
}

export class SetCurrentUserAction implements Action {
    readonly type = actionTypes.SET_CURRENT_USER;
    constructor(public payload: User) { }
}

export class GetCurrentUserSuccessAction implements Action {
    readonly type = actionTypes.GET_CURRENT_USER_SUCCESS;
    constructor(public payload: User) { }
}

export class GetCurrentUserFailAction implements Action {
    readonly type = actionTypes.GET_CURRENT_USER_FAIL;
    readonly payload = null;
}

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

export class SaveAuthTokenAction implements Action {
    readonly type = actionTypes.SAVE_AUTH_TOKEN;
    constructor(public payload?: string) { };
}

export type ProfileAction = EmailLoginAction | EmailLoginSuccessAction | EmailLoginFailAction |
    EmailRegisterAction | EmailRegisterSuccessAction | EmailRegisterFailAction |
    GetCurrentUserAction | GetCurrentUserSuccessAction | GetCurrentUserFailAction |
    SetCurrentUserAction | LogoutAction;

