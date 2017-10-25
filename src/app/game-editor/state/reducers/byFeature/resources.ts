import {Actions} from '../../actions/byFeature/resourceActions';
import * as actionTypes from '../../actions/actionTypes';
import { Resources } from '../../models/index';

const initialState: Resources = {
    items: {},
    lastInsert: null
};

export function resourcesReducer(state: Resources = initialState, action: Actions): Resources {
    switch (action.type) {
        case actionTypes.SAVE_RESOURCE_SUCCESS:
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
