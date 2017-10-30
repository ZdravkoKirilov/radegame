import * as actionTypes from '../actionTypes';
import {Action} from '@ngrx/store';
import { Game } from '../../../../game-mechanics/models/index';

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

export type Actions =
    | CreateGameAction
    | CreateGameSuccessAction
    | CreateGameFailAction;
