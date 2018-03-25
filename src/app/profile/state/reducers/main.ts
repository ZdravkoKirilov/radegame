import { createFeatureSelector, createSelector } from '@ngrx/store';

import { actionTypes, ProfileAction } from '../actions';
import { User } from '../../models';

export interface ProfileFeature {
    user?: User;
    didRegister: boolean;
    didLogin: boolean;
    didLogout: boolean;
    loginError: boolean;
    registerError: boolean;
}

export const initialState: ProfileFeature = {
    user: null,
    didRegister: false,
    didLogin: false,
    didLogout: false,
    loginError: false,
    registerError: false,
}

export const profileReducer = (state: ProfileFeature = initialState, action: ProfileAction): ProfileFeature => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload
            };
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

export const selectProfileFeature = createFeatureSelector<ProfileFeature>('profile');

export const selectUser = createSelector(selectProfileFeature, (state): User => state.user);