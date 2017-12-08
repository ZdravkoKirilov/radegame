import { TriviaAction } from '../../actions/byFeature/trivia.action';
import { Trivia } from '../../../../game-mechanics/models/index';
import { createSelector } from '@ngrx/store';
import { GameEditorFeature } from '../index';
import { selectFeature } from '../selectors';

export interface Trivias {
    items?: {
        [key: string]: Trivia
    };
    lastInsert?: Trivia;
}

const initialState: Trivias = {
    items: {},
    lastInsert: null
};

export const SAVE_TRIVIA = 'SAVE_TRIVIA';
export const SAVE_TRIVIA_SUCCESS = 'SAVE_TRIVIA_SUCCESS';
export const SAVE_TRIVIA_FAIL = 'SAVE_TRIVIA_FAIL';

export function triviaReducer(state: Trivias = initialState, action: TriviaAction): Trivias {
    switch (action.type) {
        case SAVE_TRIVIA_SUCCESS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
                lastInsert: action.payload
            };
        default:
            return state;
    }
}

export const selectTrivia = createSelector(selectFeature, (state: GameEditorFeature) => {
    return Object.keys(state.form.trivia.items);
});
