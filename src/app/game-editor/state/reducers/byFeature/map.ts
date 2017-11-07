import {Map} from '../../../models/index';
import {MapActions} from '../../actions/byFeature/mapActions';
import * as actionTypes from '../../actions/actionTypes';

const initialState: Map = {
    canvas: {
        image: null,
    },
    items: {},
    paths: {},
    siblingsList: {},
    lastInsert: null,
    lastDelete: null,
    pathCreationMode: false
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
                lastInsert: action.payload.fieldId
            };
        case actionTypes.DELETE_MAP_FIELD_SUCCESS:
            const newItems = {...state.items};
            delete newItems[action.payload.fieldId];
            return {
                ...state,
                lastDelete: state.items[action.payload.fieldId],
                items: {...newItems}
            };
        case actionTypes.TOGGLE_PATH_CREATION_MODE:
            return {
                ...state,
                pathCreationMode: action.payload
            };
        case actionTypes.SAVE_MAP_PATH_SUCCESS:
            return {
                ...state,
                paths: {
                    ...state.paths,
                    [action.payload.id]: action.payload
                }
            };
        case actionTypes.DELETE_MAP_PATH_SUCCESS:
            const newPaths = {...state.items};
            delete newPaths[action.payload.id];
            return {
                ...state,
                paths: {...newPaths}
            };
        default:
            return state;
    }
}