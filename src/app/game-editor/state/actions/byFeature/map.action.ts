import { Action } from '@ngrx/store';

import {
    CHANGE_SELECTED_PATH,
    DELETE_MAP_LOCATION,
    DELETE_MAP_LOCATION_FAIL,
    DELETE_MAP_LOCATION_SUCCESS,
    DELETE_MAP_PATH,
    DELETE_MAP_PATH_FAIL,
    DELETE_MAP_PATH_SUCCESS,
    GET_MAP,
    GET_MAP_FAIL,
    GET_MAP_LOCATIONS,
    GET_MAP_LOCATIONS_FAIL,
    GET_MAP_LOCATIONS_SUCCESS,
    GET_MAP_PATHS,
    GET_MAP_PATHS_FAIL,
    GET_MAP_PATHS_SUCCESS,
    GET_MAP_SUCCESS,
    SAVE_MAP,
    SAVE_MAP_FAIL,
    SAVE_MAP_LOCATION,
    SAVE_MAP_LOCATION_FAIL,
    SAVE_MAP_LOCATION_SUCCESS,
    SAVE_MAP_PATH,
    SAVE_MAP_PATH_FAIL,
    SAVE_MAP_PATH_SUCCESS,
    SAVE_MAP_SUCCESS,
    SET_MAP_LOCATIONS,
    SET_MAP_PATHS,
    TOGGLE_PATH_CREATION_MODE
} from '../../reducers/byFeature/map.reducer';
import { Map, MapLocation, MapLocationList, MapPath, MapPathList } from '../../../../game-mechanics/models/index';

export class SaveMapPathAction implements Action {
    constructor(public payload: MapPath) {
    }

    readonly type = SAVE_MAP_PATH;
}

export class SaveMapPathSuccessAction implements Action {
    constructor(public payload: MapPath) {
    }

    readonly type = SAVE_MAP_PATH_SUCCESS;
}

export class SaveMapPathFailAction implements Action {
    readonly payload = null;
    readonly type = SAVE_MAP_PATH_FAIL;
}

export class DeleteMapPathAction implements Action {
    constructor(public payload: MapPath) {
    }

    readonly type = DELETE_MAP_PATH;
}

export class DeleteMapPathSuccessAction implements Action {
    constructor(public payload: MapPath) {
    }

    readonly type = DELETE_MAP_PATH_SUCCESS;
}

export class GetMapPathsAction implements Action {
    constructor(public payload: { gameId: number }) {
    }

    readonly type = GET_MAP_PATHS;
}

export class GetMapPathsSuccessAction implements Action {
    constructor(public payload: MapPath[]) {
    }

    readonly type = GET_MAP_PATHS_SUCCESS;
}

export class SetMapPathsAction implements Action {
    constructor(public payload: MapPathList) {
    }

    readonly type = SET_MAP_PATHS;
}

export class GetMapPathsFailAction implements Action {
    readonly payload = null;
    readonly type = GET_MAP_PATHS_FAIL;
}

export class DeleteMapPathFailAction implements Action {
    readonly payload = null;
    readonly type = DELETE_MAP_PATH_FAIL;
}

export class TogglePathCreationModeAction implements Action {
    constructor(public payload: boolean) {
    }

    readonly type = TOGGLE_PATH_CREATION_MODE;
}

export class SaveMapLocationAction implements Action {
    constructor(public payload: MapLocation) {
    }

    readonly type = SAVE_MAP_LOCATION;
}

export class SaveMapLocationSuccessAction implements Action {
    constructor(public payload: MapLocation) {
    }

    readonly type = SAVE_MAP_LOCATION_SUCCESS;
}

export class SaveMapLocationFailAction implements Action {
    readonly payload = null;
    readonly type = SAVE_MAP_LOCATION_FAIL;
}

export class DeleteMapLocationAction implements Action {
    constructor(public payload: MapLocation) {
    }

    readonly type = DELETE_MAP_LOCATION;
}

export class DeleteMapLocationSuccessAction implements Action {
    constructor(public payload: MapLocation) {
    }

    readonly type = DELETE_MAP_LOCATION_SUCCESS;
}

export class DeleteMapLocationFailAction implements Action {
    readonly payload = null;
    readonly type = DELETE_MAP_LOCATION_FAIL;
}

export class GetMapLocationsAction implements Action {
    constructor(public payload: { gameId: number }) {
    }

    readonly type = GET_MAP_LOCATIONS;
}

export class GetMapLocationsSuccessAction implements Action {
    constructor(public payload: MapLocation[]) {
    }

    readonly type = GET_MAP_LOCATIONS_SUCCESS;
}

export class SetMapLocationsAction implements Action {
    constructor(public payload: MapLocationList) {
    }

    readonly type = SET_MAP_LOCATIONS;
}

export class GetMapLocationsFailAction implements Action {
    readonly payload = null;
    readonly type = GET_MAP_LOCATIONS_FAIL;
}

export class ChangeSelectedPathAction implements Action {
    constructor(public payload: number) {
    }

    readonly type = CHANGE_SELECTED_PATH;
}

export class SaveMapAction implements Action {
    constructor(public payload: Map) {
    }

    readonly type = SAVE_MAP;
}

export class SaveMapSuccessAction implements Action {
    constructor(public payload: Map) {
    }

    readonly type = SAVE_MAP_SUCCESS;
}

export class SaveMapFailAction implements Action {
    readonly payload = null;
    readonly type = SAVE_MAP_FAIL;
}

export class GetMapAction implements Action {
    constructor(public payload: { gameId: number }) {
    }

    readonly type = GET_MAP;
}

export class GetMapSuccessAction implements Action {
    constructor(public payload: Map) {
    }

    readonly type = GET_MAP_SUCCESS;
}

export class GetMapFailAction implements Action {
    readonly payload = null;
    readonly type = GET_MAP_FAIL;
}

export type MapAction =
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
