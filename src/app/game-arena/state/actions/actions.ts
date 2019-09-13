import { actionTypes } from "./actionTypes";
import { GameInstance } from "../../models";

export class FetchActiveGame {
    readonly type = actionTypes.FETCH_ACTIVE_GAME;
    constructor(public payload: number) { }
}

export class FetchActiveGameSuccess {
    readonly type = actionTypes.FETCH_ACTIVE_GAME_SUCCESS;
    constructor(public payload: GameInstance) { }
}

export class FetchActiveGameFail {
    readonly type = actionTypes.FETCH_ACTIVE_GAME_FAIL;
    readonly payload = null;
}

export type GameArenaAction = FetchActiveGame | FetchActiveGameSuccess | FetchActiveGameFail;