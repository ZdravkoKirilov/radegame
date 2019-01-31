import { Action } from '@ngrx/store';

import { actionTypes } from './actionTypes';
import { GameTemplate, Game } from '@app/game-mechanics';
import { Dictionary } from '@app/shared';

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

export class GetGamesAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.GET_GAMES;
}

export class GetGamesSuccessAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.GET_GAMES_SUCCESS;
}

export class SetGamesAction implements Action {
    constructor(public payload: Dictionary<Game>) {

    }

    readonly type = actionTypes.SET_GAMES;
}

export class GetGamesFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.GET_GAMES_FAIL;
}

export type CoreAction = OperationSuccessAction | OperationFailAction | AddGameAssetsAction |
    GetGamesAction | SetGamesAction | GetGamesSuccessAction | GetGamesFailAction;
