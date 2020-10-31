import { Dictionary } from "@app/shared";
import { Game, ImageAsset, Setup, GameId, ModuleId } from "@app/game-mechanics";

import {
    FETCH_GAMES, FETCH_GAMES_SUCCESS, FETCH_GAMES_FAIL, FETCH_GAME, FETCH_IMAGES,
    FETCH_IMAGES_SUCCESS, FETCH_IMAGES_FAIL, FETCH_SETUPS, FETCH_SETUPS_SUCCESS, FETCH_SETUPS_FAIL,
} from "./actionTypes";

export class FetchGames {
    readonly type = FETCH_GAMES;
}

export class FetchGamesSuccess {
    readonly type = FETCH_GAMES_SUCCESS;
    constructor(public payload: Dictionary<Game>) { }
}

export class FetchGamesFail {
    readonly type = FETCH_GAMES_FAIL;
}
export class FetchGame {
    readonly type = FETCH_GAME;
    constructor(public payload: GameId) { }
}

export class FetchImages {
    readonly type = FETCH_IMAGES;
    constructor(public payload: { moduleId: ModuleId }) { }
}

export class FetchImagesSuccess {
    readonly type = FETCH_IMAGES_SUCCESS;
    constructor(public payload: Dictionary<ImageAsset>) { }
}

export class FetchImagesFail {
    readonly type = FETCH_IMAGES_FAIL;
}

export class FetchSetups {
    readonly type = FETCH_SETUPS;
    constructor(public payload: { gameId: GameId }) { }
}

export class FetchSetupsSuccess {
    readonly type = FETCH_SETUPS_SUCCESS;
    constructor(public payload: Dictionary<Setup>) { }
}

export class FetchSetupsFail {
    readonly type = FETCH_SETUPS_FAIL;
}

export type CatalogAction = FetchGames | FetchGamesSuccess | FetchGamesFail | FetchGame |
    FetchImages | FetchImagesSuccess | FetchImagesFail | FetchSetups | FetchSetupsSuccess
    | FetchSetupsFail;