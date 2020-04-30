import { GameInstance } from "../../models";
import { GameTemplate, Game } from "@app/game-mechanics";

export const ArenaGeneralActionTypes = {
    FETCH_GAME_INSTANCE: '[Arena] FETCH_GAME_INSTANCE',
    FETCH_GAME_INSTANCE_SUCCESS: '[Arena] FETCH_GAME_INSTANCE_SUCCESS',
    FETCH_GAME_INSTANCE_FAIL: '[Arena] FETCH_GAME_INSTANCE_FAIL',

    FETCH_GAME: '[Arena] FETCH_GAME',
    FETCH_GAME_SUCCESS: '[Arena] FETCH_GAME_SUCCESS',
    FETCH_GAME_FAIL: '[Arena] FETCH_GAME_FAIL',

    FETCH_GAME_CONFIG: '[Arena] FETCH_GAME_CONFIG',
    FETCH_GAME_CONFIG_SUCCESS: '[Arena] FETCH_GAME_CONFIG_SUCCESS',
    FETCH_GAME_CONFIG_FAIL: '[Arena] FETCH_GAME_CONFIG_FAIL',

    INITIALIZE_GAME_STATE: '[Arena] CREATE_GAME_STATE',
} as const;

export class FetchGameInstance {
    readonly type = ArenaGeneralActionTypes.FETCH_GAME_INSTANCE;
    constructor(public payload: number) { }
}

export class FetchGameInstanceSuccess {
    readonly type = ArenaGeneralActionTypes.FETCH_GAME_INSTANCE_SUCCESS;
    constructor(public payload: GameInstance) { }
}

export class FetchGameInstanceFail {
    readonly type = ArenaGeneralActionTypes.FETCH_GAME_INSTANCE_FAIL;
    readonly payload = null;
}

export class FetchGame {
    readonly type = ArenaGeneralActionTypes.FETCH_GAME;
    constructor(public payload: number) { }
}

export class FetchGameSuccess {
    readonly type = ArenaGeneralActionTypes.FETCH_GAME_SUCCESS;
    constructor(public payload: Game) { }
}

export class FetchGameFail {
    readonly type = ArenaGeneralActionTypes.FETCH_GAME_FAIL;
    readonly payload = null;
}

export class FetchGameConfig {
    readonly type = ArenaGeneralActionTypes.FETCH_GAME_CONFIG;
    constructor(public payload: {
        gameId: number;
        keywords: string[];
    }) { }
}

export class FetchGameConfigSuccess {
    readonly type = ArenaGeneralActionTypes.FETCH_GAME_CONFIG_SUCCESS;
    constructor(public payload: {
        config: GameTemplate;
        keywords: string[];
    }) { }
}

export class FetchGameConfigFail {
    readonly type = ArenaGeneralActionTypes.FETCH_GAME_CONFIG_FAIL;
    readonly payload = null;
}

export class CreateGameState {
    readonly type = ArenaGeneralActionTypes.INITIALIZE_GAME_STATE;
    constructor(public payload: { conf: GameTemplate; instance?: GameInstance; round?: number; }) { }
}

export type GameArenaAction = FetchGameInstance | FetchGameInstanceSuccess | FetchGameInstanceFail | FetchGameConfig |
    FetchGameConfigSuccess | FetchGameConfigFail | FetchGame | FetchGameSuccess | FetchGameFail |
    CreateGameState;