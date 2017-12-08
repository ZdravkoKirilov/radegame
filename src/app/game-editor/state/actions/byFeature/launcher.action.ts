import { Action } from '@ngrx/store';
import { Game, GameList } from '../../../../game-mechanics/models/index';
import {
    CREATE_GAME,
    CREATE_GAME_FAIL,
    CREATE_GAME_SUCCESS,
    GET_GAMES,
    GET_GAMES_FAIL,
    GET_GAMES_SUCCESS,
    SET_GAMES
} from '../../reducers/byFeature/games.reducer';

export class CreateGameAction implements Action {
    constructor(public payload: Game) {
    }

    readonly type = CREATE_GAME;
}

export class CreateGameSuccessAction implements Action {
    constructor(public payload: Game) {
    }

    readonly type = CREATE_GAME_SUCCESS;
}

export class CreateGameFailAction implements Action {
    readonly payload = null;
    readonly type = CREATE_GAME_FAIL;
}

export class GetGamesAction implements Action {
    readonly payload = null;
    readonly type = GET_GAMES;
}

export class GetGamesSuccessAction implements Action {
    constructor(public payload: GameList) {
    }

    readonly type = GET_GAMES_SUCCESS;
}

export class SetGamesAction implements Action {
    constructor(public payload: GameList) {

    }

    readonly type = SET_GAMES;
}

export class GetGamesFailAction implements Action {
    readonly payload = null;
    readonly type = GET_GAMES_FAIL;
}

export type LauncherAction =
    | CreateGameAction
    | CreateGameSuccessAction
    | CreateGameFailAction
    | GetGamesAction
    | GetGamesSuccessAction
    | GetGamesFailAction
    | SetGamesAction;
