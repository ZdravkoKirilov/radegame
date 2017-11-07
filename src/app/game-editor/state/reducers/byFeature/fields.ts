import {Actions} from '../../actions/byFeature/fieldActions';
import * as actionTypes from '../../actions/actionTypes';
import {BoardFields} from '../../../models/index';

const initialState: BoardFields = {
    items: {},
    lastInsert: null,
    lastDelete: null,
    selectedField: null,
    showFieldEditor: false,
};

export function fieldsReducer(state: BoardFields = initialState, action: Actions): BoardFields {
    switch (action.type) {
        case actionTypes.SAVE_FIELD_SUCCESS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.id]: action.payload
                },
                lastInsert: action.payload.id

            };
        case actionTypes.DELETE_FIELD_SUCCESS:
            const newItems = {...state.items};
            delete newItems[action.payload.id];
            return {
                ...state,
                lastDelete: state.items[action.payload.id],
                items: {
                    ...newItems
                }
            };
        case actionTypes.TOGGLE_FIELD_EDITOR:
            return {
                ...state,
                showFieldEditor: action.payload
            };
        case actionTypes.CHANGE_SELECTED_FIELD:
            return {
                ...state,
                selectedField: action.payload
            };
        default:
            return state;
    }
}
