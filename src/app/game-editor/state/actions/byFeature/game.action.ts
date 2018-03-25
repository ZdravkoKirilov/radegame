import { Action } from '@ngrx/store';

import { Game, GameList } from '../../../../game-mechanics';
import {
    CREATE_GAME,
    CREATE_GAME_FAIL,
    CREATE_GAME_SUCCESS,
    CHANGE_SELECTED_GAME,
    TOGGLE_GAME_EDITOR,
    DELETE_GAME,
    DELETE_GAME_SUCCESS,
    DELETE_GAME_FAIL,
    REMOVE_GAME,
    SET_GAMES,
} from '../../reducers';

export class SetGamesAction implements Action {
    constructor(public payload: GameList) { }
    readonly type = SET_GAMES;
}

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

export class DeleteGameAction implements Action {
    constructor(public payload: Game) {
    }

    readonly type = DELETE_GAME;
}

export class RemoveGameAction implements Action {
    constructor(public payload: Game) {

    }

    readonly type = REMOVE_GAME;
}

export class DeleteGameSuccessAction implements Action {
    constructor(public payload: Game) {
    }

    readonly type = DELETE_GAME_SUCCESS;
}

export class DeleteGameFailAction implements Action {
    readonly payload = null;
    readonly type = DELETE_GAME_FAIL;
}

export class ToggleGameEditorAction implements Action {
    constructor(public payload: boolean) {
    }
    readonly type = TOGGLE_GAME_EDITOR;
}

export class ChangeSelectedGameAction implements Action {
    constructor(public payload?: Game) {
    }

    readonly type = CHANGE_SELECTED_GAME;
}

export type GameAction =
    | SetGamesAction
    | CreateGameAction
    | CreateGameSuccessAction
    | CreateGameFailAction
    | DeleteGameAction
    | DeleteGameSuccessAction
    | DeleteGameFailAction
    | RemoveGameAction
    | ToggleGameEditorAction
    | ChangeSelectedGameAction;
