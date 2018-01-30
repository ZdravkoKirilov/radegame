import { createSelector } from '@ngrx/store';

import { Round } from '../../../../game-mechanics/models/index';
import { selectFeature } from '../selectors';
import { GameEditorFeature } from '../index';
import { RoundAction } from '../../actions/byFeature/round.action';

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
            const items = {...state.items};
            delete items[action.payload.id];
            return {...state, items, lastDelete: action.payload};
        case SET_ROUNDS:
            return {
                ...state,
                items: action.payload
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

export const selectRounds = createSelector(selectFeature, (state: GameEditorFeature) => {
    const rounds = state.form.rounds.items ? Object.values(state.form.rounds.items) : [];
    rounds.sort((a: Round, b: Round) => {
        if (a.order > b.order) {
            return 1;
        }
        if (a.order < b.order) {
            return -1;
        }
        return 0;
    });
    return rounds;
});
export const getSelectedRound = createSelector(selectFeature, (state: GameEditorFeature): Round => {
    return state.form.rounds.selectedItem;
});
export const selectRoundEditorState = createSelector(selectFeature, (state: GameEditorFeature): boolean => {
    return state.form.rounds.showEditor;
});