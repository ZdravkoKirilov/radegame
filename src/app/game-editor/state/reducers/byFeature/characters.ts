import {Actions} from '../../actions/byFeature/characterActions';
import * as actionTypes from '../../actions/actionTypes';
import { Characters } from '../../../models/index';

const initialState: Characters = {
    items: {},
    lastInsert: null
};

export function charactersReducer(state: Characters = initialState, action: Actions): Characters {
    switch (action.type) {
        case actionTypes.SAVE_CHARACTER_SUCCESS:
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
