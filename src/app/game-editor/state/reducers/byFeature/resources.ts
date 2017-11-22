import { Actions } from '../../actions/byFeature/resourceActions';
import * as actionTypes from '../../actions/actionTypes';
import { Resources } from '../../../models/index';
import { Resource } from '../../../../game-mechanics/models/Resource';
import { toIndexedList } from '../../../../shared/utils/utils';

const initialState: Resources = {
    items: {},
    lastInsert: null,
    lastDelete: null,
    showEditor: false,
    selectedItem: null
};

export function resourcesReducer(state: Resources = initialState, action: Actions): Resources {
    switch (action.type) {
        case actionTypes.ADD_RESOURCE:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
                lastInsert: action.payload
            };
        case actionTypes.REMOVE_RESOURCE:
            const items = {...state.items};
            delete items[action.payload.id];
            return {...state, items, lastDelete: action.payload};
        case actionTypes.SET_RESOURCES:
            const resources = toIndexedList(action.payload);
            return {...state, items: resources};
        case actionTypes.TOGGLE_RESOURCE_EDITOR:
            return {
                ...state,
                showEditor: action.payload
            };
        case actionTypes.CHANGE_SELECTED_RESOURCE:
            return {
                ...state,
                selectedItem: action.payload
            };
        default:
            return state;
    }
}
