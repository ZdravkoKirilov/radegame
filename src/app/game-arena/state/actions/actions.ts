import { actionTypes } from "./actionTypes";
import { GameInstance } from "../../models";
import { GameTemplate } from "@app/game-mechanics";

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

export class FetchGameConfig {
    readonly type = actionTypes.FETCH_GAME_CONFIG;
    constructor(public payload: number) { }
}

export class FetchGameConfigSuccess {
    readonly type = actionTypes.FETCH_GAME_CONFIG_SUCCESS;
    constructor(public payload: GameTemplate) { }
}

export class FetchGameConfigFail {
    readonly type = actionTypes.FETCH_GAME_CONFIG_FAIL;
    readonly payload = null;
}

export type GameArenaAction = FetchActiveGame | FetchActiveGameSuccess | FetchActiveGameFail | FetchGameConfig |
    FetchGameConfigSuccess | FetchGameConfigFail;