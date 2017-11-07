import * as actionTypes from '../actionTypes';
import {Action} from '@ngrx/store';

import {Map} from '../../../models/index';
import {MapFieldSettings, MapPath} from '../../../../game-mechanics/models/index';

export class UpdateMapAction implements Action {
    constructor(public payload: Map) {
    }

    readonly type = actionTypes.UPDATE_MAP;
}

export class SaveMapFieldAction implements Action {
    constructor(public payload: MapFieldSettings) {
    }

    readonly type = actionTypes.SAVE_MAP_FIELD;
}

export class SaveMapFieldSuccessAction implements Action {
    constructor(public payload: MapFieldSettings) {
    }

    readonly type = actionTypes.SAVE_MAP_FIELD_SUCCESS;
}

export class SaveMapFieldFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.SAVE_MAP_FIELD_FAIL;
}

export class DeleteMapFieldAction implements Action {
    constructor(public payload: MapFieldSettings) {
    }

    readonly type = actionTypes.DELETE_MAP_FIELD;
}

export class DeleteMapFieldSuccessAction implements Action {
    constructor(public payload: MapFieldSettings) {
    }

    readonly type = actionTypes.DELETE_MAP_FIELD_SUCCESS;
}

export class DeleteMapFieldFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.DELETE_MAP_FIELD_FAIL;
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

export type MapActions =
    UpdateMapAction |
    SaveMapFieldAction |
    SaveMapFieldSuccessAction |
    SaveMapFieldFailAction |
    DeleteMapFieldAction |
    DeleteMapFieldSuccessAction |
    DeleteMapFieldFailAction |
    SaveMapPathAction |
    SaveMapPathSuccessAction |
    SaveMapPathFailAction |
    DeleteMapPathAction |
    DeleteMapPathSuccessAction |
    DeleteMapPathFailAction |
    TogglePathCreationModeAction;
