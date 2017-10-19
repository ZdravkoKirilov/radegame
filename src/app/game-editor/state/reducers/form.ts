import { GameTemplate} from '../../../game-mechanics/models/index';
import { Actions } from '../actions/actions';
import * as actionTypes from '../actions/actionTypes';

const initialState: GameTemplate = {
    metadata: {},
    resources: {
        items: {}
    },
    characters: {
        items: {}
    }
};

export function gameEditorFormReducer(state: GameTemplate = initialState, action: Actions): GameTemplate {
    switch (action.type) {
        case actionTypes.UPDATE_FIELD:
            return {
                ...state,
                [action.payload.branch]: {
                    ...state[action.payload.branch],
                    ...action.payload.data
                }
            };
        case actionTypes.SAVE_RESOURCE_SUCCESS:
            return {
                ...state,
                resources: {
                    ...state.resources,
                    items: {
                        ...state.resources.items,
                        [action.payload.id]: action.payload
                    },
                    lastInsert: action.payload
                }
            };
        case actionTypes.SAVE_CHARACTER_SUCCESS:
            return {
                ...state,
                characters: {
                    ...state.characters,
                    items: {
                        ...state.characters.items,
                        [action.payload.id]: action.payload
                    },
                    lastInsert: action.payload
                }
            };
        default:
            return state;
    }
}