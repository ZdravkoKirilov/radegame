import { MapAction } from '../../actions/byFeature/map.action';
import { MapLocation, MapLocationList, MapPath, GameMap } from '../../../../game-mechanics/models/index';
import { createSelector } from '@ngrx/store';
import { GameEditorFeature } from '../index';
import { selectFeature } from '../selectors';

import { toIndexedList } from '../../../../shared/utils/utils';

export interface MapState {
    items?: { [key: string]: MapLocation };
    paths?: { [key: string]: MapPath };
    siblingsList?: { [key: string]: number[] };
    lastInsert?: number;
    lastDelete?: MapLocation;
    pathCreationMode?: boolean;
    selectedPath?: MapPath;
}

const initialState: MapState = {
    items: null,
    paths: null,
    siblingsList: {},
    lastInsert: null,
    lastDelete: null,
    pathCreationMode: false,
    selectedPath: null
};

export const GET_MAP_LOCATIONS = 'GET_MAP_LOCATIONS';
export const GET_MAP_LOCATIONS_SUCCESS = 'GET_MAP_LOCATIONS_SUCCESS';
export const GET_MAP_LOCATIONS_FAIL = 'GET_MAP_LOCATIONS_FAIL';
export const SET_MAP_LOCATIONS = 'SET_MAP_LOCATIONS';
export const SAVE_MAP_LOCATION = 'SAVE_MAP_LOCATION';
export const SAVE_MAP_LOCATION_SUCCESS = 'SAVE_MAP_LOCATION_SUCCESS';
export const SAVE_MAP_LOCATION_FAIL = 'SAVE_MAP_LOCATION_FAIL';
export const DELETE_MAP_LOCATION = 'DELETE_MAP_LOCATION';
export const DELETE_MAP_LOCATION_SUCCESS = 'DELETE_MAP_LOCATION_SUCCESS';
export const DELETE_MAP_LOCATION_FAIL = 'DELETE_MAP_LOCATION_FAIL';

export const GET_MAP_PATHS = 'GET_MAP_PATHS';
export const GET_MAP_PATHS_SUCCESS = 'GET_MAP_PATHS_SUCCESS';
export const GET_MAP_PATHS_FAIL = 'GET_MAP_PATHS_FAIL';
export const SET_MAP_PATHS = 'SET_MAP_PATHS';
export const SAVE_MAP_PATH = 'SAVE_MAP_PATH';
export const SAVE_MAP_PATH_SUCCESS = 'SAVE_MAP_PATH_SUCCESS';
export const SAVE_MAP_PATH_FAIL = 'SAVE_MAP_PATH_FAIL';
export const DELETE_MAP_PATH = 'DELETE_MAP_PATH';
export const DELETE_MAP_PATH_SUCCESS = 'DELETE_MAP_PATH_SUCCESS';
export const DELETE_MAP_PATH_FAIL = 'DELETE_MAP_PATH_FAIL';

export const CHANGE_SELECTED_PATH = 'CHANGE_SELECTED_PATH';
export const TOGGLE_PATH_CREATION_MODE = 'TOGGLE_PATH_CREATION_MODE';

export function mapReducer(state: MapState = initialState, action: MapAction): MapState {
    switch (action.type) {
        case SAVE_MAP_LOCATION_SUCCESS:
            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.field]: action.payload,
                },
                lastInsert: action.payload.field
            };
        case DELETE_MAP_LOCATION_SUCCESS:
            const newItems = { ...state.items };
            delete newItems[action.payload.field];
            return {
                ...state,
                lastDelete: state.items[action.payload.id],
                items: {
                    ...newItems
                }
            };
        case SET_MAP_LOCATIONS:
            return {
                ...state,
                items: action.payload
            };
        case TOGGLE_PATH_CREATION_MODE:
            return {
                ...state,
                pathCreationMode: action.payload
            };
        case SAVE_MAP_PATH_SUCCESS:
            return {
                ...state,
                paths: {
                    ...state.paths,
                    [action.payload.id]: action.payload
                }
            };
        case DELETE_MAP_PATH_SUCCESS:
            const newPaths = { ...state.paths };
            delete newPaths[action.payload.id];
            return {
                ...state,
                paths: { ...newPaths }
            };
        case SET_MAP_PATHS:
            return {
                ...state,
                paths: action.payload
            };
        case CHANGE_SELECTED_PATH:
            return {
                ...state,
                selectedPath: action.payload
            };
        default:
            return state;
    }
}

export const selectMapLocations = createSelector(selectFeature, (state: GameEditorFeature): MapLocationList => {
    return state.form.map.items;
});
export const selectLocationsByStageId = (stageId: number) => createSelector(selectFeature, (state: GameEditorFeature): MapLocationList => {
    const asArray = Object.values(state.form.map.items).filter(elem => elem.stage === stageId);
    return toIndexedList(asArray, 'field');
});
export const selectMapPaths = createSelector(selectFeature, (state: GameEditorFeature): MapPath[] => {
    return Object.values(state.form.map.paths);
});
export const selectPathsByStageId = (stageId: number) => createSelector(selectFeature, (state: GameEditorFeature): MapPath[] => {
    return Object.values(state.form.map.paths).filter(elem => elem.stage === stageId);
});
export const getSelectedPath = createSelector(selectFeature, (state: GameEditorFeature): MapPath => {
    return state.form.map.selectedPath;
});
export const selectPathCreationMode = createSelector(selectFeature, (state: GameEditorFeature): boolean => {
    return state.form.map.pathCreationMode;
});
