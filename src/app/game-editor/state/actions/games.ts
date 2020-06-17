import { Action } from '@ngrx/store';

import { GameId, Game, GameTemplate } from '@app/game-mechanics';

export const gameActionTypes = {
  SAVE_GAME: 'SAVE_GAME',
  SET_GAME: 'SET_GAME',

  DELETE_GAME: 'DELETE_GAME',
  REMOVE_GAME: 'REMOVE_GAME',

  FETCH_GAMES: 'FETCH_GAMES',
  SET_GAMES: 'SET_GAMES',

  TOGGLE_GAME_EDITOR: 'TOGGLE_GAME_EDITOR',
  CHANGE_SELECTED_GAME: 'CHANGE_SELECTED_GAME',

  FETCH_GAME_DATA: 'FETCH_GAME_DATA',
  SET_GAME_DATA: 'SET_GAME_DATA',
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

export class ToggleGameEditorAction implements Action {
  readonly type = gameActionTypes.TOGGLE_GAME_EDITOR;
  constructor(public payload: { showEditor: boolean }) { }
};

export class ChangeSelectedGameAction implements Action {
  readonly type = gameActionTypes.CHANGE_SELECTED_GAME;
  constructor(public payload: { game: Game }) { }
};

export class FetchGamesAction implements Action {
  readonly type = gameActionTypes.FETCH_GAMES;
};

export class SetGamesAction implements Action {
  readonly type = gameActionTypes.SET_GAMES;
  constructor(public payload: { games: Game[] }) { }
};

export class FetchGameData implements Action {
  readonly type = gameActionTypes.FETCH_GAME_DATA;
  constructor(public payload: { gameId: GameId}) {}
};

export class SetGameData implements Action {
  readonly type = gameActionTypes.SET_GAME_DATA;
  constructor(public payload: { data: GameTemplate }) {}
};

export type EditorGameAction = SaveGameAction | SetGameAction | DeleteGameAction | RemoveGameAction | ToggleGameEditorAction | ChangeSelectedGameAction | FetchGamesAction | SetGamesAction| FetchGameData | SetGameData;