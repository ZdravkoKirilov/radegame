import * as actionTypes from '../actionTypes';
import {Action} from '@ngrx/store';

import {Map} from '../../../models/index';

export class UpdateMapAction implements Action {
    constructor(public payload: Map) {
    }

    readonly type = actionTypes.UPDATE_MAP;
}

export type MapActions =
    UpdateMapAction;
