import { createSelector } from "@ngrx/store";

import { selectGameId } from "@app/shared";
import { toGameId } from "@app/game-mechanics";

import { selectFeature } from "./common";
import { gameSelectors } from "../reducers/gamesReducer";

const selectGamesFeature = createSelector(
  selectFeature,
  feature => feature.games,
);

export const selectAllGames = createSelector(
  selectGamesFeature,
  gameSelectors.selectAll,
);

export const selectGame = createSelector(
  selectAllGames,
  selectGameId,
  (games, id) => {
    return games ? games.find(elem => elem.id == toGameId(id)) : null;
  }
);
