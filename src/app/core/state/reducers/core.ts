import { actionTypes, CoreAction } from '../actions';
import { User } from '@app/core';

export interface CoreFeature {
    user?: User;
}

export const initialState: CoreFeature = {
    user: null,
}

export const coreReducer = (state: CoreFeature = initialState, action: CoreAction): CoreFeature => {
    switch (action.type) {
        case actionTypes.SET_CURRENT_USER:
            return {
                ...state,
                user: action.payload
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                user: null,
            };
        default:
            return state;
    }
};