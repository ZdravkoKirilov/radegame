import * as actionTypes from '../actionTypes';
import {Action} from '@ngrx/store';

import {Map} from '../../../models/index';
import {MapFieldSettings} from '../../../../game-mechanics/models/index';

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

export type MapActions =
    UpdateMapAction |
    SaveMapFieldAction |
    SaveMapFieldSuccessAction |
    SaveMapFieldFailAction;
