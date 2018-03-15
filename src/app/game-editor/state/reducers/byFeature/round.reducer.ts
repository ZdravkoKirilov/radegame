import { createSelector } from '@ngrx/store';

import { Round } from '../../../../game-mechanics';
import { selectFeature } from '../selectors';
import { GameEditorFeature } from '../main.reducer';
import { RoundAction } from '../../actions';
import { selectGame } from './assets.reducer';

export interface GameRound {
    items?: {
        [key: string]: Round
    };
    lastInsert?: Round;
    lastDelete?: Round;
    showEditor?: boolean;
    selectedItem?: Round;
}

const initialState: GameRound = {
    items: null,
    lastInsert: null,
    lastDelete: null,
    showEditor: false,
    selectedItem: null
};

export const SAVE_ROUND = 'SAVE_ROUND';
export const DELETE_ROUND = 'DELETE_ROUND';
export const SET_ROUNDS = 'SET_ROUNDS';
export const GET_ROUNDS = 'GET_ROUNDS';
export const GET_ROUNDS_SUCCESS = 'GET_ROUNDS_SUCCESS';
export const GET_ROUNDS_FAIL = 'GET_ROUNDS_FAIL';
export const ADD_ROUND = 'ADD_ROUND';
export const SAVE_ROUND_SUCCESS = 'SAVE_ROUND_SUCCESS';
export const SAVE_ROUND_FAIL = 'SAVE_ROUND_FAIL';
export const DELETE_ROUND_SUCCESS = 'DELETE_ROUND_SUCCESS';
export const DELETE_ROUND_FAIL = 'DELETE_ROUND_FAIL';
export const REMOVE_ROUND = 'REMOVE_ROUND';
export const TOGGLE_ROUND_EDITOR = 'TOGGLE_ROUND_EDITOR';
export const CHANGE_SELECTED_ROUND = 'CHANGE_SELECTED_ROUND';

export function roundsReducer(state: GameRound = initialState, action: RoundAction): GameRound {
    switch (action.type) {
        case ADD_ROUND:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
                lastInsert: action.payload
            };
        case REMOVE_ROUND:
            const items = { ...state.items };
            delete items[action.payload.id];
            return { ...state, items, lastDelete: action.payload };
        case SET_ROUNDS:
            return {
                ...state,
                items: { ...state.items, ...action.payload }
            };
        case TOGGLE_ROUND_EDITOR:
            return {
                ...state,
                showEditor: action.payload
            };
        case CHANGE_SELECTED_ROUND:
            return {
                ...state,
                selectedItem: action.payload
            };
        default:
            return state;
    }
}

const selectCurrentFeature = createSelector(selectFeature, (state: GameEditorFeature): GameRound => state.form.rounds);

export const selectRounds = createSelector(selectCurrentFeature, selectGame, (state, game): Round[] => {
    const rounds = state.items ? Object.values(state.items).filter(elem => elem.game === game.id) : [];
    return rounds;
});
export const getSelectedRound = createSelector(selectCurrentFeature, (state): Round => state.selectedItem);
export const selectRoundEditorState = createSelector(selectCurrentFeature, (state): boolean => state.showEditor);
