import produce from 'immer';
import { EntityState, createEntityAdapter } from '@ngrx/entity';

import { Game } from "@app/game-mechanics";
import { gameActionTypes, EditorGameAction } from '../actions';

export type EditorGamesState = EntityState<Game> & {
  showEditor: boolean;
  selectedGame: Game;
};

export const gameAdapter = createEntityAdapter<Game>({
  selectId: elem => elem.id,
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

export const gamesReducer = (state: EditorGamesState, action: EditorGameAction): EditorGamesState => {

  switch (action.type) {
    case gameActionTypes.SET_GAME:
      return gameAdapter.upsertOne(action.payload.game, state);
    case gameActionTypes.REMOVE_GAME:
      return gameAdapter.removeOne(action.payload.game.id, state);
    case gameActionTypes.SET_GAMES:
      return gameAdapter.addAll(action.payload.games, state);
    case gameActionTypes.CHANGE_SELECTED_GAME:
      return produce(state, draft => {
        draft.selectedGame = action.payload.game;
      });
    case gameActionTypes.TOGGLE_GAME_EDITOR:
      return produce(state, draft => {
        draft.showEditor = action.payload.showEditor;
      });
    default:
      return state;
  }
};

export const gameSelectors = gameAdapter.getSelectors();