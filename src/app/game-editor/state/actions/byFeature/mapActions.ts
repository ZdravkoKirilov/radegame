import * as actionTypes from '../actionTypes';
import {Action} from '@ngrx/store';

import {Map} from '../../../models/index';
import {MapLocation, MapPath} from '../../../../game-mechanics/models/index';

export class UpdateMapAction implements Action {
    constructor(public payload: Map) {
    }

    readonly type = actionTypes.UPDATE_MAP;
}

export class SaveMapPathAction implements Action {
    constructor(public payload: MapPath) {
    }

    readonly type = actionTypes.SAVE_MAP_PATH;
}

export class SaveMapPathSuccessAction implements Action {
    constructor(public payload: MapPath) {
    }

    readonly type = actionTypes.SAVE_MAP_PATH_SUCCESS;
}

export class SaveMapPathFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.SAVE_MAP_PATH_FAIL;
}

export class DeleteMapPathAction implements Action {
    constructor(public payload: MapPath) {
    }

    readonly type = actionTypes.DELETE_MAP_PATH;
}

export class DeleteMapPathSuccessAction implements Action {
    constructor(public payload: MapPath) {
    }

    readonly type = actionTypes.DELETE_MAP_PATH_SUCCESS;
}

export class DeleteMapPathFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.DELETE_MAP_PATH_FAIL;
}

export class TogglePathCreationModeAction implements Action {
    constructor(public payload: boolean) {
    }

    readonly type = actionTypes.TOGGLE_PATH_CREATION_MODE;
}

export class SaveMapLocationAction implements Action {
    constructor(public payload: MapLocation) {
    }

    readonly type = actionTypes.SAVE_MAP_LOCATION;
}

export class SaveMapLocationSuccessAction implements Action {
    constructor(public payload: MapLocation) {
    }

    readonly type = actionTypes.SAVE_MAP_LOCATION_SUCCESS;
}

export class SaveMapLocationFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.SAVE_MAP_LOCATION_FAIL;
}

export class DeleteMapLocationAction implements Action {
    constructor(public payload: MapLocation) {
    }

    readonly type = actionTypes.DELETE_MAP_LOCATION;
}

export class DeleteMapLocationSuccessAction implements Action {
    constructor(public payload: MapLocation) {
    }

    readonly type = actionTypes.DELETE_MAP_LOCATION_SUCCESS;
}

export class DeleteMapLocationFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.DELETE_MAP_LOCATION_FAIL;
}

export class GetMapLocationsAction implements Action {
    constructor(public payload: { gameId: number }) {
    }

    readonly type = actionTypes.GET_MAP_LOCATIONS;
}

export class GetMapLocationsSuccessAction implements Action {
    constructor(public payload: MapLocation[]) {
    }

    readonly type = actionTypes.GET_MAP_LOCATIONS_SUCCESS;
}

export class GetMapLocationsFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.GET_MAP_LOCATIONS_FAIL;
}

export type MapActions =
    UpdateMapAction |
    SaveMapLocationAction |
    SaveMapLocationSuccessAction |
    SaveMapLocationFailAction |
    DeleteMapLocationAction |
    DeleteMapLocationSuccessAction |
    DeleteMapLocationFailAction |
    SaveMapPathAction |
    SaveMapPathSuccessAction |
    SaveMapPathFailAction |
    DeleteMapPathAction |
    DeleteMapPathSuccessAction |
    DeleteMapPathFailAction |
    TogglePathCreationModeAction |
    GetMapLocationsAction |
    GetMapLocationsSuccessAction |
    GetMapLocationsFailAction;
