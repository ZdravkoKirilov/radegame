import {
    TOGGLE_FORM, CREATE_LOBBY, CREATE_LOBBY_FAIL, CREATE_LOBBY_SUCCESS,
    ADD_LOBBY, FETCH_LOBBIES, FETCH_LOBBIES_FAIL, FETCH_LOBBIES_SUCCESS, FETCH_LOBBY,
    FETCH_LOBBY_FAIL, FETCH_LOBBY_SUCCESS, FETCH_GAME_FAIL, FETCH_GAME_SUCCESS, FETCH_GAME, FETCH_PLAYERS, FETCH_PLAYERS_SUCCESS, FETCH_PLAYERS_FAIL, FETCH_ALL_PLAYERS, FETCH_ALL_PLAYERS_SUCCESS, FETCH_PLAYERS_ALL_FAIL,
} from "./actionTypes";
import { Lobby, Player } from "../models";
import { Game } from "@app/game-mechanics";

export class ToggleForm {
    readonly type = TOGGLE_FORM;
    constructor(public payload: boolean) { }
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
    constructor(public payload: Lobby[]) { }
}

export class FetchLobbiesFail {
    readonly type = FETCH_LOBBIES_FAIL;
}

export class FetchLobby {
    readonly type = FETCH_LOBBY;
    constructor(public payload: string) { }
}

export class FetchLobbySuccess {
    readonly type = FETCH_LOBBY_SUCCESS;
    constructor(public payload: Lobby) { }
}

export class FetchLobbyFail {
    readonly type = FETCH_LOBBY_FAIL;
}

export class FetchGame {
    readonly type = FETCH_GAME;
    constructor(public payload: number) { }
}

export class FetchGameSuccess {
    readonly type = FETCH_GAME_SUCCESS;
    constructor(public payload: Game) { }
}

export class FetchGameFail {
    readonly type = FETCH_GAME_FAIL;
}

export class FetchPlayers {
    readonly type = FETCH_PLAYERS;
    constructor(public payload: string) { }
}

export class FetchPlayersSuccess {
    readonly type = FETCH_PLAYERS_SUCCESS;
    constructor(public payload: Player[]) { }
}

export class FetchPlayersFail {
    readonly type = FETCH_PLAYERS_FAIL;
}

export class FetchAllPlayers {
    readonly type = FETCH_ALL_PLAYERS;
    constructor() { }
}

export class FetchAllPlayersSuccess {
    readonly type = FETCH_ALL_PLAYERS_SUCCESS;
    constructor(public payload: Player[]) { }
}

export class FetchAllPlayersFail {
    readonly type = FETCH_PLAYERS_ALL_FAIL;
}

export type LobbyAction = ToggleForm | CreateLobby | CreateLobbyFail | CreateLobbySuccess | AddLobby |
    FetchLobbies | FetchLobbiesSuccess | FetchLobbiesFail | FetchGame |
    FetchGameSuccess | FetchGameFail | FetchPlayers | FetchPlayersFail | FetchPlayersSuccess |
    FetchAllPlayers | FetchAllPlayersFail | FetchAllPlayersSuccess;