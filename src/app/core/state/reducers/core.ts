import { actionTypes, CoreAction } from '../actions';
import { User } from '@app/core';
import { ActiveGame } from '../../models';

export interface CoreFeature {
  user?: User;
  activeGames: ActiveGame[];
}

export const initialState: CoreFeature = {
  user: undefined,
  activeGames: [],
}

export function coreReducer(state: CoreFeature = initialState, action: CoreAction): CoreFeature {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload as any
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        user: undefined,
      };
    case actionTypes.FETCH_ACTIVE_GAMES_SUCCESS:
      return {
        ...state,
        activeGames: action.payload as any
      };
    case actionTypes.ADD_ACTIVE_GAME:
      return {
        ...state,
        activeGames: [...state.activeGames, action.payload] as any
      };
    default:
      return state;
  }
};