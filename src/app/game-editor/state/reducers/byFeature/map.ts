import {MapState} from '../../../models/index';
import {MapActions} from '../../actions/byFeature/mapActions';
import * as actionTypes from '../../actions/actionTypes';
import {MapLocation, MapPath, Map} from '../../../../game-mechanics/models/index';

const initialState: MapState = {
    canvas: {
        image: null,
        id: null,
        game: null
    },
    items: {},
    paths: {},
    siblingsList: {},
    lastInsert: null,
    lastDelete: null,
    pathCreationMode: false,
    selectedPath: null
};

export function mapReducer(state: MapState = initialState, action: MapActions): MapState {
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
            delete newItems[action.payload.field];
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
            return {...state, items: {...items}};
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
            const newPaths = {...state.paths};
            delete newPaths[action.payload.id];
            return {
                ...state,
                paths: {...newPaths}
            };
        case actionTypes.GET_MAP_PATHS_SUCCESS:
            return {
                ...state,
                paths: action.payload.reduce((acc: { [key: string]: MapPath }, elem: MapPath) => {
                    acc[elem.id] = elem;
                    return acc;
                }, {})
            };
        case actionTypes.CHANGE_SELECTED_PATH:
            return {
                ...state,
                selectedPath: action.payload
            };
        case actionTypes.SAVE_MAP_SUCCESS:
            return {
                ...state,
                canvas: {
                    ...state.canvas,
                    ...action.payload
                }
            };
        case actionTypes.GET_MAP_SUCCESS:
            return {
                ...state,
                canvas: {...action.payload}
            };
        default:
            return state;
    }
}
