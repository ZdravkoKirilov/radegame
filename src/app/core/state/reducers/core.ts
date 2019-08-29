import { actionTypes, CoreAction } from '../actions';
import { User } from '@app/core';
import { ActiveGame } from '../../models';

export interface CoreFeature {
    user?: User;
    activeGames: ActiveGame[];
}

export const initialState: CoreFeature = {
    user: null,
    activeGames: [],
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
        case actionTypes.FETCH_ACTIVE_GAMES_SUCCESS:
            return {
                ...state,
                activeGames: action.payload
            };
        case actionTypes.ADD_ACTIVE_GAME:
            return {
                ...state,
                activeGames: [...state.activeGames, action.payload]
            };
        default:
            return state;
    }
};