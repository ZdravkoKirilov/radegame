import {
    FETCH_GAMES, FETCH_GAMES_SUCCESS, FETCH_GAMES_FAIL, FETCH_GAME, FETCH_IMAGES, FETCH_IMAGES_SUCCESS,
    FETCH_IMAGES_FAIL, SELECT_SETUP, CREATE_LOBBY, CREATE_LOBBY_SUCCESS, CREATE_LOBBY_FAIL, ADD_LOBBY, FETCH_LOBBIES,
    FETCH_LOBBIES_FAIL, FETCH_LOBBIES_SUCCESS, FETCH_LOBBY, FETCH_LOBBY_FAIL, FETCH_LOBBY_SUCCESS
} from "./actionTypes";
import { Dictionary } from "@app/shared";
import { Game, ImageAsset } from "@app/game-mechanics";
import { Lobby } from "../models";

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

export class SelectSetup {
    readonly type = SELECT_SETUP;
    constructor(public payload: number) { }
}

export class CreateLobby {
    readonly type = CREATE_LOBBY;
    constructor(public payload: Lobby) { }
}

export class CreateLobbySuccess {
    readonly type = CREATE_LOBBY_SUCCESS;
}

export class CreateLobbyFail {
    readonly type = CREATE_LOBBY_FAIL;
}

export class AddLobby {
    readonly type = ADD_LOBBY;
    constructor(public payload: Lobby) { }
}

export class FetchLobbies {
    readonly type = FETCH_LOBBIES;
}

export class FetchLobbiesSuccess {
    readonly type = FETCH_LOBBIES_SUCCESS;
    constructor(public payload: Dictionary<Lobby>) { }
}

export class FetchLobbiesFail {
    readonly type = FETCH_LOBBIES_FAIL;
}

export class FetchLobby {
    readonly type = FETCH_LOBBY;
}

export class FetchLobbySuccess {
    readonly type = FETCH_LOBBY_SUCCESS;
    constructor(public payload: Lobby) { }
}

export class FetchLobbyFail {
    readonly type = FETCH_LOBBY_FAIL;
}

export type BrowseAction = FetchGames | FetchGamesSuccess | FetchGamesFail | FetchGame |
    FetchImages | FetchImagesSuccess | FetchImagesFail | SelectSetup | CreateLobby | CreateLobbyFail | CreateLobbySuccess | AddLobby |
    FetchLobbies | FetchLobbiesSuccess | FetchLobbiesFail;