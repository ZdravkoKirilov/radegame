import { Action } from '@ngrx/store';

import { actionTypes } from './actionTypes';
import { GameTemplate } from '../../../game-mechanics';

export class OperationSuccessAction implements Action {
    readonly type = actionTypes.OPERATION_SUCCESS;
    constructor(public payload: string) { }
}

export class OperationFailAction implements Action {
    readonly type = actionTypes.OPERATION_FAIL;
    constructor(public payload: string) { }
}

export class AddGameAssetsAction implements Action {
    readonly type = actionTypes.ADD_GAME_ASSETS;
    constructor(public payload: {
        game: number;
        data: GameTemplate;
    }) { }
}

export type CoreAction = OperationSuccessAction | OperationFailAction | AddGameAssetsAction;
