import { createSelector } from '@ngrx/store';

import { Trivia, TriviaList } from '../../../../game-mechanics/models/index';
import { selectFeature } from '../selectors';
import { GameEditorFeature } from '../index';
import { TriviaAction } from '../../actions/byFeature/trivia.action';

export interface GameTrivia {
    items?: TriviaList;
    lastInsert?: Trivia;
    lastDelete?: Trivia;
    showEditor?: boolean;
    selectedItem?: Trivia;
}

const initialState: GameTrivia = {
    items: null,
    lastInsert: null,
    lastDelete: null,
    showEditor: false,
    selectedItem: null
};

export const SAVE_TRIVIA = 'SAVE_TRIVIA';
export const DELETE_TRIVIA = 'DELETE_TRIVIA';
export const SET_TRIVIAS = 'SET_TRIVIAS';
export const GET_TRIVIAS = 'GET_TRIVIAS';
export const GET_TRIVIAS_SUCCESS = 'GET_TRIVIAS_SUCCESS';
export const GET_TRIVIAS_FAIL = 'GET_TRIVIAS_FAIL';
export const ADD_TRIVIA = 'ADD_v';
export const SAVE_TRIVIA_SUCCESS = 'SAVE_TRIVIA_SUCCESS';
export const SAVE_TRIVIA_FAIL = 'SAVE_TRIVIA_FAIL';
export const DELETE_TRIVIA_SUCCESS = 'DELETE_TRIVIA_SUCCESS';
export const DELETE_TRIVIA_FAIL = 'DELETE_TRIVIA_FAIL';
export const REMOVE_TRIVIA = 'REMOVE_TRIVIA';
export const TOGGLE_TRIVIA_EDITOR = 'TOGGLE_TRIVIA_EDITOR';
export const CHANGE_SELECTED_TRIVIA = 'CHANGE_SELECTED_TRIVIA';

export function triviaReducer(state: GameTrivia = initialState, action: TriviaAction): GameTrivia {
    switch (action.type) {
        case ADD_TRIVIA:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
                lastInsert: action.payload
            };
        case REMOVE_TRIVIA:
            const items = {...state.items};
            delete items[action.payload.id];
            return {...state, items, lastDelete: action.payload};
        case SET_TRIVIAS:
            return {
                ...state,
                items: action.payload
            };
        case TOGGLE_TRIVIA_EDITOR:
            return {
                ...state,
                showEditor: action.payload
            };
        case CHANGE_SELECTED_TRIVIA:
            return {
                ...state,
                selectedItem: action.payload
            };
        default:
            return state;
    }
}

export const selectTrivias = createSelector(selectFeature, (state: GameEditorFeature): Trivia[] => {
    return state.form.trivia.items ? Object.values(state.form.trivia.items) : [];
});
export const getSelectedTrivia = createSelector(selectFeature, (state: GameEditorFeature): Trivia => {
    return state.form.trivia.selectedItem;
});
export const selectTriviaEditorState = createSelector(selectFeature, (state: GameEditorFeature): boolean => {
    return state.form.trivia.showEditor;
});
