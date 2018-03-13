import { Action } from '@ngrx/store';

import {
    GOOGLE_LOGIN,
    FACEBOOK_LOGIN,
    GOOGLE_LOGIN_SUCCESS,
    GOOGLE_LOGIN_FAIL,
    FACEBOOK_LOGIN_FAIL,
    FACEBOOK_LOGIN_SUCCESS
} from './reducers';

export class LoginWithGoogle implements Action {
    readonly type = GOOGLE_LOGIN;
    readonly payload = null;
}

export class LoginWithGoogleSuccess implements Action {
    readonly type = GOOGLE_LOGIN_SUCCESS;
    readonly payload = null;
}

export class LoginWithGoogleFail implements Action {
    readonly type = GOOGLE_LOGIN_FAIL;
    readonly payload = null;
}

export class LoginWithFacebook implements Action {
    readonly type = FACEBOOK_LOGIN;
    readonly payload = null;
}

export class LoginWithFacebookSuccess implements Action {
    readonly type = FACEBOOK_LOGIN_SUCCESS;
    readonly payload = null;
}

export class LoginWithFacebookFail implements Action {
    readonly type = FACEBOOK_LOGIN_FAIL;
    readonly payload = null;
}

export type SocialAuthAction = LoginWithGoogle |
    LoginWithFacebookSuccess |
    LoginWithFacebookFail |
    LoginWithFacebook |
    LoginWithGoogleSuccess |
    LoginWithGoogleFail;

