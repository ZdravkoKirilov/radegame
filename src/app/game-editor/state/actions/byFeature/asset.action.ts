import { Action } from '@ngrx/store';

import { GameEditorAssets, UPDATE_EDITOR_ASSET } from '../../reducers/byFeature/assets.reducer';

export class UpdateEditorAssetsAction implements Action {
    constructor(public payload: GameEditorAssets) {
    }

    readonly type = UPDATE_EDITOR_ASSET;
}

export type Actions = UpdateEditorAssetsAction;
