import * as actionTypes from '../actionTypes';
import { Action } from '@ngrx/store';

import { MapState } from '../../../models/index';
import { MapLocation, MapLocationList, MapPath, MapPathList, Map } from '../../../../game-mechanics/models/index';

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

export class GetMapPathsAction implements Action {
    constructor(public payload: { gameId: number }) {
    }

    readonly type = actionTypes.GET_MAP_PATHS;
}

export class GetMapPathsSuccessAction implements Action {
    constructor(public payload: MapPath[]) {
    }

    readonly type = actionTypes.GET_MAP_PATHS_SUCCESS;
}

export class SetMapPathsAction implements Action {
    constructor(public payload: MapPathList) {
    }

    readonly type = actionTypes.SET_MAP_PATHS;
}

export class GetMapPathsFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.GET_MAP_PATHS_FAIL;
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

export class SetMapLocationsAction implements Action {
    constructor(public payload: MapLocationList) {
    }

    readonly type = actionTypes.SET_MAP_LOCATIONS;
}

export class GetMapLocationsFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.GET_MAP_LOCATIONS_FAIL;
}

export class ChangeSelectedPathAction implements Action {
    constructor(public payload: number) {
    }

    readonly type = actionTypes.CHANGE_SELECTED_PATH;
}

export class SaveMapAction implements Action {
    constructor(public payload: Map) {
    }

    readonly type = actionTypes.SAVE_MAP;
}

export class SaveMapSuccessAction implements Action {
    constructor(public payload: Map) {
    }

    readonly type = actionTypes.SAVE_MAP_SUCCESS;
}

export class SaveMapFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.SAVE_MAP_FAIL;
}

export class GetMapAction implements Action {
    constructor(public payload: { gameId: number }) {
    }

    readonly type = actionTypes.GET_MAP;
}

export class GetMapSuccessAction implements Action {
    constructor(public payload: Map) {
    }

    readonly type = actionTypes.GET_MAP_SUCCESS;
}

export class GetMapFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.GET_MAP_FAIL;
}

export type MapActions =
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
    GetMapPathsAction |
    GetMapPathsSuccessAction |
    SetMapPathsAction |
    GetMapPathsFailAction |
    TogglePathCreationModeAction |
    GetMapLocationsAction |
    GetMapLocationsSuccessAction |
    SetMapLocationsAction |
    GetMapLocationsFailAction |
    ChangeSelectedPathAction |
    GetMapAction |
    GetMapSuccessAction |
    GetMapFailAction |
    SaveMapAction |
    SaveMapSuccessAction |
    SaveMapFailAction;
