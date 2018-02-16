import { LauncherAction } from '../../actions/byFeature/launcher.action';
import { Game } from '../../../../game-mechanics/models/index';
import { createSelector } from '@ngrx/store';
import { GameEditorFeature } from '../index';
import { selectFeature } from '../selectors';

export interface GamesList {
    items: {
        [key: string]: Game
    };
    lastInsert?: Game;
}

const initialState: GamesList = {
    items: null,
    lastInsert: null
};

export const GET_GAMES = 'GET_GAMES';
export const GET_GAMES_SUCCESS = 'GET_GAMES_SUCCESS';
export const GET_GAMES_FAIL = 'GET_GAMES_FAIL';
export const CREATE_GAME = 'CREATE_GAME';
export const SET_GAMES = 'SET_GAMES';
export const CREATE_GAME_SUCCESS = 'CREATE_GAME_SUCCESS';
export const CREATE_GAME_FAIL = 'CREATE_GAME_FAIL';

export function gamesReducer(state: GamesList = initialState, action: LauncherAction): GamesList {
    switch (action.type) {
        case CREATE_GAME_SUCCESS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.title]: action.payload
                },
                lastInsert: action.payload

            };
        case SET_GAMES:
            return {
                ...state,
                items: action.payload
            };
        default:
            return state;
    }
}

export const selectGames = createSelector(selectFeature, (state: GameEditorFeature): Game[] => {
    return Object.values(state.games.items);
});