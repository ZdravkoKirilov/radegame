import { SocialAuthAction } from './actions';

export const GOOGLE_LOGIN = 'GOOGLE_LOGIN';
export const FACEBOOK_LOGIN = 'FACEBOOK_LOGIN';

export const GOOGLE_LOGIN_SUCCESS = 'GOOGLE_LOGIN_SUCCESS';
export const GOOGLE_LOGIN_FAIL = 'GOOGLE_LOGIN_FAIL';

export const FACEBOOK_LOGIN_SUCCESS = 'FACEBOOK_LOGIN_SUCCESS';
export const FACEBOOK_LOGIN_FAIL = 'FACEBOOK_LOGIN_FAIL';

export interface SocialAuthState {
    loading: boolean;
    error?: boolean;
}

const initialState = {
    loading: false,
    error: false,
};

export const socialAuthReducer = (state: SocialAuthState = initialState, action: SocialAuthAction): SocialAuthState => {
    switch (action.type) {
        case GOOGLE_LOGIN:
        case FACEBOOK_LOGIN:
            return {
                ...state,
                loading: true,
            };
        case GOOGLE_LOGIN_SUCCESS:
        case GOOGLE_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: false,
            };
        case GOOGLE_LOGIN_FAIL:
        case FACEBOOK_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
            };
        default:
            return state;
    }
};
