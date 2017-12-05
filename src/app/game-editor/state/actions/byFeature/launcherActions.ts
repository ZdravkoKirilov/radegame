import * as actionTypes from '../actionTypes';
import { Action } from '@ngrx/store';
import { Game, GameList } from '../../../../game-mechanics/models/index';

export class CreateGameAction implements Action {
    constructor(public payload: Game) {
    }

    readonly type = actionTypes.CREATE_GAME;
}

export class CreateGameSuccessAction implements Action {
    constructor(public payload: Game) {
    }

    readonly type = actionTypes.CREATE_GAME_SUCCESS;
}

export class CreateGameFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.CREATE_GAME_FAIL;
}

export class GetGamesAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.GET_GAMES;
}

export class GetGamesSuccessAction implements Action {
    constructor(public payload: GameList) {
    }

    readonly type = actionTypes.GET_GAMES_SUCCESS;
}

export class SetGamesAction implements Action {
    constructor(public payload: GameList) {

    }

    readonly type = actionTypes.SET_GAMES;
}

export class GetGamesFailAction implements Action {
    readonly payload = null;
    readonly type = actionTypes.GET_GAMES_FAIL;
}

export type Actions =
    | CreateGameAction
    | CreateGameSuccessAction
    | CreateGameFailAction
    | GetGamesAction
    | GetGamesSuccessAction
    | GetGamesFailAction
    | SetGamesAction;
