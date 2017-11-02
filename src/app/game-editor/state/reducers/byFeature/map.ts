import {Map} from '../../../models/index';
import {MapActions} from '../../actions/byFeature/mapActions';
import * as actionTypes from '../../actions/actionTypes';

const initialState: Map = {
    canvas: {
        image: null,
    },
    items: {},
    lastInsert: null
};

export function mapReducer(state: Map = initialState, action: MapActions): Map {
    switch (action.type) {
        case actionTypes.UPDATE_MAP:
            return {
                ...state,
                ...action.payload
            };
        case actionTypes.SAVE_MAP_FIELD_SUCCESS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.fieldId]: action.payload,
                },
                lastInsert: action.payload
            };
        default:
            return state;
    }
}