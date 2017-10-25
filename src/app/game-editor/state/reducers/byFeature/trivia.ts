import {Actions} from '../../actions/byFeature/triviaActions';
import * as actionTypes from '../../actions/actionTypes';
import { Trivias } from '../../models/index';

const initialState: Trivias = {
    items: {},
    lastInsert: null
};

export function triviaReducer(state: Trivias = initialState, action: Actions): Trivias {
    switch (action.type) {
        case actionTypes.SAVE_TRIVIA_SUCCESS:
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
