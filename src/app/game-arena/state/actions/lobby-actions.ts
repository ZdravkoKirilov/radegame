import { Lobby, LobbyPlayer, ChatMessage, GameInstance } from "../../models";
import { GameId } from "@app/game-mechanics";

export enum LobbyActionTypes {
  FETCH_LOBBIES = '[Lobby] FETCH_LOBBIES', // remote command
  ADD_LOBBIES = '[Lobby] ADD_LOBBIES', // local mutation

  CREATE_LOBBY = '[Lobby] CREATE_LOBBY',
  ADD_LOBBY = '[Lobby] ADD_LOBBY',

  DELETE_LOBBY = '[Lobby] DELETE_LOBBY',
  REMOVE_LOBBY = '[Lobby] REMOVE_LOBBY',

  SAVE_PLAYER = '[Lobby] SAVE_PLAYER',
  ADD_PLAYER = '[Lobby] ADD_PLAYER',

  DELETE_PLAYER = '[Lobby] DELETE_PLAYER',
  REMOVE_PLAYER = '[Lobby] REMOVE_PLAYER',

  SEND_MESSAGE = '[Lobby] SEND_MESSAGE',
  ADD_MESSAGE = '[Lobby] SAVE_MESSAGE',
  FETCH_MESSAGES = '[Lobby] FETCH_MESSAGES',
  ADD_MESSAGES = '[Lobby] ADD_MESSAGES',

  CREATE_GAME = '[Lobby] CREATE_GAME',
  START_GAME = '[Lobby] START_GAME',

  /* used when lobby view is destroyed */
  CLEAR_STATE = '[Lobby] CLEAR_STATE',
  /* used when lobby view is destroyed */
};

export class FetchLobbies {
  readonly type = LobbyActionTypes.FETCH_LOBBIES;
  constructor(public payload: { gameId: GameId }) { }
}

export class AddLobbies {
  readonly type = LobbyActionTypes.ADD_LOBBIES;
  constructor(public payload: { lobbies: Lobby[], players: LobbyPlayer[] }) { }
}

export class CreateLobby {
  readonly type = LobbyActionTypes.CREATE_LOBBY;
  constructor(public payload: { lobby: Lobby, owner: LobbyPlayer }) { }
}

export class AddLobby {
  readonly type = LobbyActionTypes.ADD_LOBBY;
  constructor(public payload: { lobby: Lobby, owner: LobbyPlayer }) { }
}

export class DeleteLobby {
  readonly type = LobbyActionTypes.DELETE_LOBBY;
  constructor(public payload: { lobby: Lobby }) { }
}

export class RemoveLobby {
  readonly type = LobbyActionTypes.REMOVE_LOBBY;
  constructor(public payload: { lobby: Lobby }) { }
}

export class SavePlayer {
  readonly type = LobbyActionTypes.SAVE_PLAYER;
  constructor(public payload: { player: LobbyPlayer }) { }
}

export class AddPlayer {
  readonly type = LobbyActionTypes.ADD_PLAYER;
  constructor(public payload: { player: LobbyPlayer }) { }
}

export class DeletePlayer {
  readonly type = LobbyActionTypes.DELETE_PLAYER;
  constructor(public payload: { player: LobbyPlayer }) { }
}

export class RemovePlayer {
  readonly type = LobbyActionTypes.REMOVE_PLAYER;
  constructor(public payload: { player: LobbyPlayer }) { }
}

export class SendMessage {
  readonly type = LobbyActionTypes.SEND_MESSAGE;
  constructor(public payload: { message: ChatMessage }) { }
}

export class AddMessage {
  readonly type = LobbyActionTypes.ADD_MESSAGE;
  constructor(public payload: { message: ChatMessage }) { }
}

export class CreateGame {
  readonly type = LobbyActionTypes.CREATE_GAME;
  constructor(public payload: { game_data: {
    game_id: number;
    players: LobbyPlayer[];
    setup: number;
  } }) { }
}

export class StartGame {
  readonly type = LobbyActionTypes.START_GAME;
  constructor(public payload: { game: GameInstance }) { }
}

export class ClearLobbyState {
  readonly type = LobbyActionTypes.CLEAR_STATE;
}

export type LobbyAction = FetchLobbies | AddLobbies | CreateLobby | AddLobby | DeleteLobby | RemoveLobby |
  SavePlayer | AddPlayer | DeletePlayer | RemovePlayer | SendMessage | AddMessage | ClearLobbyState |
  CreateGame | StartGame;