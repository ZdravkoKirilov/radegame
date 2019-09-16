import { actionTypes } from "./actionTypes";
import { GameInstance } from "../../models";
import { GameTemplate, Game, GameConfig, GameState, Player } from "@app/game-mechanics";

export class FetchGameInstance {
    readonly type = actionTypes.FETCH_GAME_INSTANCE;
    constructor(public payload: number) { }
}

export class FetchGameInstanceSuccess {
    readonly type = actionTypes.FETCH_GAME_INSTANCE_SUCCESS;
    constructor(public payload: GameInstance) { }
}

export class FetchGameInstanceFail {
    readonly type = actionTypes.FETCH_GAME_INSTANCE_FAIL;
    readonly payload = null;
}

export class FetchGame {
    readonly type = actionTypes.FETCH_GAME;
    constructor(public payload: number) { }
}

export class FetchGameSuccess {
    readonly type = actionTypes.FETCH_GAME_SUCCESS;
    constructor(public payload: Game) { }
}

export class FetchGameFail {
    readonly type = actionTypes.FETCH_GAME_FAIL;
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

export class CreateGameState {
    readonly type = actionTypes.INITIALIZE_GAME_STATE;
    constructor(public payload: { conf: GameConfig; instance: GameInstance; players: Player[] }) { }
}

export class SetGameState {
    readonly type = actionTypes.SET_GAME_STATE;
    constructor(public payload: GameState) { }
}

export type GameArenaAction = FetchGameInstance | FetchGameInstanceSuccess | FetchGameInstanceFail | FetchGameConfig |
    FetchGameConfigSuccess | FetchGameConfigFail | FetchGame | FetchGameSuccess | FetchGameFail |
    CreateGameState | SetGameState;