import * as actionTypes from './actionTypes';
import {Action} from '@ngrx/store';

import {GameEditorAssets} from '../models/index';

export class UpdateEditorAssetsAction implements Action {
    constructor(public payload: GameEditorAssets) {
    }

    readonly type = actionTypes.UPDATE_EDITOR_ASSET;
}

export type Actions = UpdateEditorAssetsAction;
