import {Map} from '../../../models/index';
import {MapActions} from '../../actions/byFeature/mapActions';
import * as actionTypes from '../../actions/actionTypes';
import {MapLocation} from '../../../../game-mechanics/models/BoardField';

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
        case actionTypes.SAVE_MAP_LOCATION_SUCCESS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.field]: action.payload,
                },
                lastInsert: action.payload.field
            };
        case actionTypes.DELETE_MAP_LOCATION_SUCCESS:
            const newItems = {...state.items};
            delete newItems[action.payload.id];
            return {
                ...state,
                lastDelete: state.items[action.payload.id],
                items: {
                    ...newItems
                }
            };
        case actionTypes.GET_MAP_LOCATIONS_SUCCESS:
            const items = action.payload.reduce((acc: any, elem: MapLocation) => {
                acc[elem.field] = elem;
                return acc;
            }, {});
            return {...state, items};
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
