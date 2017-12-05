import { Actions } from '../../actions/byFeature/factionActions';
import * as actionTypes from '../../actions/actionTypes';
import { Factions } from '../../../models/index';

const initialState: Factions = {
    items: {},
    lastInsert: null,
    lastDelete: null,
    showEditor: false,
    selectedItem: null
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
        case actionTypes.SET_FACTIONS:
            return {
                ...state,
                items: action.payload
            };
        case actionTypes.TOGGLE_FACTION_EDITOR:
            return {
                ...state,
                showEditor: action.payload
            };
        case actionTypes.CHANGE_SELECTED_FACTION:
            return {
                ...state,
                selectedItem: action.payload
            };
        default:
            return state;
    }
}
