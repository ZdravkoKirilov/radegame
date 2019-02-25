import {
    SELECT_SETUP, CREATE_LOBBY, CREATE_LOBBY_FAIL, CREATE_LOBBY_SUCCESS,
    ADD_LOBBY, FETCH_LOBBIES, FETCH_LOBBIES_FAIL, FETCH_LOBBIES_SUCCESS, FETCH_LOBBY,
    FETCH_LOBBY_FAIL, FETCH_LOBBY_SUCCESS
} from "./actionTypes";
import { Lobby } from "../models";
import { Dictionary } from "@app/shared";

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

export type LobbyAction = SelectSetup | CreateLobby | CreateLobbyFail | CreateLobbySuccess | AddLobby |
    FetchLobbies | FetchLobbiesSuccess | FetchLobbiesFail;