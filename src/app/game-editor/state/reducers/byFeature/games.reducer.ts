import { createSelector } from '@ngrx/store';

import { GameAction } from '../../actions';
import { Game } from '../../../../game-mechanics';
import { GameEditorFeature } from '../main.reducer';
import { selectFeature } from '../selectors';

export interface GamesList {
    items: {
        [key: string]: Game
    };
    lastInsert?: Game;
    lastDelete?: Game;
    showEditor?: boolean;
    selectedItem?: Game;
}

const initialState: GamesList = {
    items: null,
    lastInsert: null,
    lastDelete: null,
    showEditor: false,
    selectedItem: null,
};

export const GET_GAMES = 'GET_GAMES';
export const GET_GAMES_SUCCESS = 'GET_GAMES_SUCCESS';
export const GET_GAMES_FAIL = 'GET_GAMES_FAIL';
export const CREATE_GAME = 'CREATE_GAME';
export const DELETE_GAME = 'DELETE_GAME';
export const SET_GAMES = 'SET_GAMES';
export const REMOVE_GAME = 'REMOVE_GAME';
export const CREATE_GAME_SUCCESS = 'CREATE_GAME_SUCCESS';
export const CREATE_GAME_FAIL = 'CREATE_GAME_FAIL';
export const TOGGLE_GAME_EDITOR = 'TOGGLE_GAME_EDITOR';
export const CHANGE_SELECTED_GAME = 'CHANGE_SELECTED_GAME';
export const DELETE_GAME_SUCCESS = 'DELETE_GAME_SUCCESS';
export const DELETE_GAME_FAIL = 'DELETE_GAME_FAIL';

export function gamesReducer(state: GamesList = initialState, action: GameAction): GamesList {
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
                items: { ...state.items, ...action.payload }
            };
        case REMOVE_GAME:
            const items = { ...state.items };
            delete items[action.payload.id];
            return { ...state, items, lastDelete: action.payload };
        case TOGGLE_GAME_EDITOR:
            return {
                ...state,
                showEditor: action.payload
            };
        case CHANGE_SELECTED_GAME:
            return {
                ...state,
                selectedItem: action.payload
            };
        default:
            return state;
    }
}

const selectCurrentFeature = createSelector(selectFeature, (state: GameEditorFeature): GamesList => state.games);

export const selectGames = createSelector(selectCurrentFeature, (state): Game[] => Object.values(state.items));
export const selectGameEditorToggleState = createSelector(selectCurrentFeature, (state): boolean => state.showEditor);
export const getSelectedGame = createSelector(selectCurrentFeature, (state): Game => state.selectedItem);
