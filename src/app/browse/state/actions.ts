import { Action } from "@ngrx/store";
import { FETCH_GAMES, FETCH_GAMES_SUCCESS, FETCH_GAMES_FAIL, FETCH_GAME, FETCH_IMAGES, FETCH_IMAGES_SUCCESS, FETCH_IMAGES_FAIL, SELECT_SETUP } from "./actionTypes";
import { Dictionary } from "@app/shared";
import { Game, ImageAsset, Setup } from "@app/game-mechanics";

export class FetchGames implements Action {
    readonly type = FETCH_GAMES;
    constructor() { }
}

export class FetchGamesSuccess implements Action {
    readonly type = FETCH_GAMES_SUCCESS;
    constructor(public payload: Dictionary<Game>) { }
}

export class FetchGamesFail implements Action {
    readonly type = FETCH_GAMES_FAIL;
    constructor() { }
}
export class FetchGame implements Action {
    readonly type = FETCH_GAME;
    constructor(public payload: number) { }
}

export class FetchImages implements Action {
    readonly type = FETCH_IMAGES;
    constructor(public payload: number) { }
}

export class FetchImagesSuccess implements Action {
    readonly type = FETCH_IMAGES_SUCCESS;
    constructor(public payload: Dictionary<ImageAsset>) { }
}

export class FetchImagesFail implements Action {
    readonly type = FETCH_IMAGES_FAIL;
    constructor() { }
}

export class SelectSetup implements Action {
    readonly type = SELECT_SETUP;
    constructor(public payload: number) { }
}

export type BrowseAction = FetchGames | FetchGamesSuccess | FetchGamesFail | FetchGame |
    FetchImages | FetchImagesSuccess | FetchImagesFail | SelectSetup;