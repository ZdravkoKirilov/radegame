import { Action } from "@ngrx/store";
import { FETCH_GAMES, FETCH_GAMES_SUCCESS, FETCH_GAMES_FAIL, FETCH_GAME } from "./actionTypes";
import { Dictionary } from "@app/shared";
import { Game } from "@app/game-mechanics";

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

export type BrowseAction = FetchGames | FetchGamesSuccess | FetchGamesFail | FetchGame;