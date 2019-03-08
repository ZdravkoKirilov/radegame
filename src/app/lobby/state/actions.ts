import {
    TOGGLE_FORM, CREATE_LOBBY, CREATE_LOBBY_FAIL, CREATE_LOBBY_SUCCESS,
    ADD_LOBBY, FETCH_LOBBIES, FETCH_LOBBIES_FAIL, FETCH_LOBBIES_SUCCESS, FETCH_LOBBY,
    FETCH_LOBBY_FAIL, FETCH_LOBBY_SUCCESS, FETCH_GAME_FAIL, FETCH_GAME_SUCCESS, FETCH_GAME, FETCH_PLAYERS,
    FETCH_PLAYERS_SUCCESS, FETCH_PLAYERS_FAIL, FETCH_ALL_PLAYERS, FETCH_ALL_PLAYERS_SUCCESS,
    FETCH_PLAYERS_ALL_FAIL, REMOVE_PLAYER, REMOVE_LOBBY, FETCH_TEAMS, FETCH_TEAMS_SUCCESS, FETCH_TEAMS_FAIL,
    FETCH_FACTIONS, FETCH_FACTIONS_SUCCESS, FETCH_FACTIONS_FAIL, FETCH_IMAGES, FETCH_IMAGES_SUCCESS, FETCH_IMAGES_FAIL,
    CREATE_PLAYER, SAVE_PLAYER, REMOVE_PLAYERS, UPDATE_PLAYER, DELETE_PLAYER, DELETE_LOBBY,
} from "./actionTypes";
import { Lobby, Player } from "../models";
import { Game, Team, Faction, ImageAsset } from "@app/game-mechanics";

export class ToggleForm {
    readonly type = TOGGLE_FORM;
    constructor(public payload: boolean) { }
}

export class CreateLobby {
    readonly type = CREATE_LOBBY;
    constructor(public payload: {
        lobby: Lobby,
        owner: Player
    }) { }
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

export class RemoveLobby {
    readonly type = REMOVE_LOBBY;
    constructor(public payload: string) { }
}

export class DeleteLobby {
    readonly type = DELETE_LOBBY;
    constructor(public payload: string) { }
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

export class CreatePlayer {
    readonly type = CREATE_PLAYER;
    constructor(public payload: Player) { }
}

export class SavePlayer {
    readonly type = SAVE_PLAYER;
    constructor(public payload: Player) { }
}

export class UpdatePlayer {
    readonly type = UPDATE_PLAYER;
    constructor(public payload: Player) { }
}

export class RemovePlayer {
    readonly type = REMOVE_PLAYER;
    constructor(public payload: string) { }
}

export class DeletePlayer {
    readonly type = DELETE_PLAYER;
    constructor(public payload: string) { }
}

export class RemovePlayers {
    readonly type = REMOVE_PLAYERS;
    constructor(public payload: string[]) { }
}

export class FetchTeams {
    readonly type = FETCH_TEAMS;
    constructor(public payload: number) { }
}

export class FetchTeamsSuccess {
    readonly type = FETCH_TEAMS_SUCCESS;
    constructor(public payload: Team[]) { }
}

export class FetchTeamsFail {
    readonly type = FETCH_TEAMS_FAIL;
}

export class FetchFactions {
    readonly type = FETCH_FACTIONS;
    constructor(public payload: number) { }
}

export class FetchFactionsSuccess {
    readonly type = FETCH_FACTIONS_SUCCESS;
    constructor(public payload: Faction[]) { }
}

export class FetchFactionsFail {
    readonly type = FETCH_FACTIONS_FAIL;
}

export class FetchImages {
    readonly type = FETCH_IMAGES;
    constructor(public payload: number) { }
}

export class FetchImagesSuccess {
    readonly type = FETCH_IMAGES_SUCCESS;
    constructor(public payload: ImageAsset[]) { }
}

export class FetchImagesFail {
    readonly type = FETCH_IMAGES_FAIL;
}

export type LobbyAction = ToggleForm | CreateLobby | CreateLobbyFail | CreateLobbySuccess | AddLobby |
    RemoveLobby | FetchLobbies | FetchLobbiesSuccess | FetchLobbiesFail | FetchGame |
    FetchGameSuccess | FetchGameFail | FetchPlayers | FetchPlayersFail | FetchPlayersSuccess |
    FetchAllPlayers | FetchAllPlayersFail | FetchAllPlayersSuccess | CreatePlayer | SavePlayer | RemovePlayer | FetchLobby | FetchLobbyFail | FetchLobbySuccess | DeleteLobby
    | FetchTeams | FetchTeamsSuccess | FetchTeamsFail | FetchFactions | FetchFactionsSuccess |
    FetchFactionsFail | FetchImages | FetchImagesFail | FetchImagesSuccess | RemovePlayers;