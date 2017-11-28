import {Actions} from '../../actions/byFeature/factionActions';
import * as actionTypes from '../../actions/actionTypes';
import { Factions } from '../../../models/index';

const initialState: Factions = {
    items: {},
    lastInsert: null
};

export function factionsReducer(state: Factions = initialState, action: Actions): Factions {
    switch (action.type) {
        case actionTypes.SAVE_FACTION_SUCCESS:
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
