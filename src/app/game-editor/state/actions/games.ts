import { Action } from '@ngrx/store';

import { GameId, Game, ModuleId, VersionId, GameData } from '@app/game-mechanics';
import { UserId } from '@app/core';

export const gameActionTypes = {
  SAVE_GAME: '[Editor] SAVE_GAME',
  SET_GAME: '[Editor] SET_GAME',

  DELETE_GAME: '[Editor] DELETE_GAME',
  REMOVE_GAME: '[Editor] REMOVE_GAME',

  FETCH_GAMES: '[Editor] FETCH_GAMES',
  SET_GAMES: '[Editor] SET_GAMES',

  FETCH_GAME_DATA: '[Editor] FETCH_GAME_DATA',
  SET_GAME_DATA: '[Editor] SET_GAME_DATA',

  FETCH_GAME_DETAILS: '[Editor] FETCH_GAME_DETAILS',
} as const;

export class SaveGameAction implements Action {
  readonly type = gameActionTypes.SAVE_GAME;
  constructor(public payload: { game: Game }) { }
};

export class SetGameAction implements Action {
  readonly type = gameActionTypes.SET_GAME;
  constructor(public payload: { game: Game }) { }
};

export class DeleteGameAction implements Action {
  readonly type = gameActionTypes.DELETE_GAME;
  constructor(public payload: { game: Game }) { }
};

export class RemoveGameAction implements Action {
  readonly type = gameActionTypes.REMOVE_GAME;
  constructor(public payload: { game: Game }) { }
};

export class FetchGamesAction implements Action {
  readonly type = gameActionTypes.FETCH_GAMES;
  constructor(public payload: { userId: UserId }) { }
};

export class SetGamesAction implements Action {
  readonly type = gameActionTypes.SET_GAMES;
  constructor(public payload: { games: Game[] }) { }
};

export class FetchGameData implements Action {
  readonly type = gameActionTypes.FETCH_GAME_DATA;
  constructor(public payload: { gameId: GameId, moduleId: ModuleId, versionId: VersionId }) { }
};

export class SetGameData implements Action {
  readonly type = gameActionTypes.SET_GAME_DATA;
  constructor(public payload: { data: GameData }) { }
};

export class FetchGameDetails implements Action {
  readonly type = gameActionTypes.FETCH_GAME_DETAILS;
  constructor(public payload: { gameId: GameId }) { }
}

export type EditorGameAction = SaveGameAction | SetGameAction | DeleteGameAction | RemoveGameAction | FetchGamesAction | SetGamesAction | FetchGameData | SetGameData | FetchGameDetails;