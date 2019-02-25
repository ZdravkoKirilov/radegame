import {
    FETCH_GAMES, FETCH_GAMES_SUCCESS, FETCH_GAMES_FAIL, FETCH_GAME, FETCH_IMAGES,
    FETCH_IMAGES_SUCCESS, FETCH_IMAGES_FAIL,
} from "./actionTypes";
import { Dictionary } from "@app/shared";
import { Game, ImageAsset } from "@app/game-mechanics";
import { Lobby } from "../../lobby/models";

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
    constructor(public payload: number) { }
}

export class FetchImages {
    readonly type = FETCH_IMAGES;
    constructor(public payload: number) { }
}

export class FetchImagesSuccess {
    readonly type = FETCH_IMAGES_SUCCESS;
    constructor(public payload: Dictionary<ImageAsset>) { }
}

export class FetchImagesFail {
    readonly type = FETCH_IMAGES_FAIL;
}

export type CatalogAction = FetchGames | FetchGamesSuccess | FetchGamesFail | FetchGame |
    FetchImages | FetchImagesSuccess | FetchImagesFail;