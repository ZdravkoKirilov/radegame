import { actionTypes, ProfileAction } from '../actions';

export interface ProfileFeature {
    didRegister: boolean;
    didLogin: boolean;
    didLogout: boolean;
    loginError: boolean;
    registerError: boolean;
}

export const initialState: ProfileFeature = {
    didRegister: false,
    didLogin: false,
    didLogout: false,
    loginError: false,
    registerError: false,
}

export const profileReducer = (state: ProfileFeature = initialState, action: ProfileAction): ProfileFeature => {
    switch (action.type) {
        case actionTypes.EMAIL_LOGIN_SUCCESS:
            return {
                ...state,
                didLogin: true
            };

        case actionTypes.EMAIL_LOGIN_FAIL:
            return {
                ...state,
                loginError: true
            };

        case actionTypes.EMAIL_REGISTER_SUCCESS:
            return {
                ...state,
                didRegister: true
            };

        case actionTypes.EMAIL_REGISTER_FAIL:
            return {
                ...state,
                registerError: true
            };
        default:
            return state;
    }
}