import { createSelector } from '@ngrx/store';

import { MapAction } from '../../actions';
import { MapLocation, MapLocationList, MapPath, MapPathList } from '../../../../game-mechanics';
import { GameEditorFeature } from '../main.reducer';
import { selectFeature } from '../selectors';
import { toIndexedList } from '../../../../shared';

export interface MapState {
    items?: MapLocationList;
    paths?: MapPathList;
    lastInsert?: number;
    lastDelete?: MapLocation;
    pathCreationMode?: boolean;
    selectedPath?: MapPath;
    fetchError?: boolean;
    loading?: boolean;
}

const initialState: MapState = {
    items: null,
    paths: null,
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
                items: { ...state.items, ...action.payload }
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
                paths: { ...state.paths, ...action.payload }
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

const selectCurrentFeature = createSelector(selectFeature, (state: GameEditorFeature): MapState => state.form.map);

export const selectMapLocations = createSelector(selectCurrentFeature, (state): MapLocationList => state.items);
export const selectLocationsByStageId = (stageId: number) => createSelector(selectCurrentFeature, (state): MapLocationList => {
    const asArray = Object.values(state.items).filter(elem => elem.stage === stageId);
    return toIndexedList(asArray, 'field');
});
export const selectMapPaths = createSelector(selectCurrentFeature, (state): MapPath[] => {
    return Object.values(state.paths);
});
export const selectPathsByStageId = (stageId: number) => createSelector(selectCurrentFeature, (state): MapPath[] => {
    return Object.values(state.paths).filter(elem => elem.stage === stageId);
});
export const getSelectedPath = createSelector(selectCurrentFeature, (state): MapPath => state.selectedPath);
export const selectPathCreationMode = createSelector(selectCurrentFeature, (state): boolean => state.pathCreationMode);
