import { Action } from '@ngrx/store';

import { GameEditorAssets, UPDATE_EDITOR_ASSET, GET_GAME, GET_GAME_SUCCESS, GET_GAME_FAIL } from '../../reducers/byFeature/assets.reducer';

export class UpdateEditorAssetsAction implements Action {
    constructor(public payload: GameEditorAssets) {
    }

    readonly type = UPDATE_EDITOR_ASSET;
}

export class GetGameAction implements Action {
    constructor(public payload: number) {

    }

    readonly type = GET_GAME;
}

export class GetGameSuccessAction implements Action {
    readonly payload = null;
    readonly type = GET_GAME_SUCCESS;
}

export class GetGameFailAction implements Action {
    readonly payload = null;
    readonly type = GET_GAME_FAIL;
}

export type Actions = UpdateEditorAssetsAction | GetGameAction | GetGameSuccessAction | GetGameFailAction;
