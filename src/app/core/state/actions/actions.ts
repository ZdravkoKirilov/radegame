import { Action } from '@ngrx/store';

import { actionTypes } from './actionTypes';
import { ActiveGame, UserId, User } from '../../models';

export class LogoutAction implements Action {
    readonly type = actionTypes.LOGOUT;
    readonly payload = null;
}

export class GetCurrentUserAction implements Action {
    readonly type = actionTypes.GET_CURRENT_USER;
    readonly payload = null;
}

export class SetCurrentUserAction implements Action {
    readonly type = actionTypes.SET_CURRENT_USER;
    constructor(public payload: User) { }
}

export class GetCurrentUserSuccessAction implements Action {
    readonly type = actionTypes.GET_CURRENT_USER_SUCCESS;
    constructor(public payload: User) { }
}

export class GetCurrentUserFailAction implements Action {
    readonly type = actionTypes.GET_CURRENT_USER_FAIL;
    readonly payload = null;
}

export class OperationSuccessAction implements Action {
    readonly type = actionTypes.OPERATION_SUCCESS;
    constructor(public payload: string) { }
}

export class OperationFailAction implements Action {
    readonly type = actionTypes.OPERATION_FAIL;
    constructor(public payload: string) { }
}

export class FetchActiveGames {
    readonly type = actionTypes.FETCH_ACTIVE_GAMES;
    constructor(public payload: { userId: UserId }) { }
}

export class FetchActiveGamesSuccess {
    readonly type = actionTypes.FETCH_ACTIVE_GAMES_SUCCESS;
    constructor(public payload: ActiveGame[]) { }
}

export class FetchActiveGamesFail {
    readonly type = actionTypes.FETCH_ACTIVE_GAMES_FAIL;
    readonly payload = null;
}

export class AddActiveGame {
    readonly type = actionTypes.ADD_ACTIVE_GAME;
    constructor(public payload: ActiveGame) { }
}

export type CoreAction = OperationSuccessAction | OperationFailAction | LogoutAction | GetCurrentUserAction |
    GetCurrentUserSuccessAction | GetCurrentUserFailAction | SetCurrentUserAction | FetchActiveGames |
    FetchActiveGamesSuccess | FetchActiveGamesFail | AddActiveGame;