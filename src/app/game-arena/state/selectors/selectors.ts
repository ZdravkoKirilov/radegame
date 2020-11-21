import { createSelector } from "reselect";
import get from "lodash/get";

import { CommonGameStore, Player, } from "@app/game-mechanics";
import { selectUser, AppState } from "@app/core";

import { FEATURE_NAME } from "../../config";
import { createArenaExpressionContext } from "../../helpers";

const selectFeature = (state: AppState) => state[FEATURE_NAME];

const selectGeneralFeature = createSelector(
  selectFeature,
  feature => feature.general
);

export const selectGameState = createSelector(
  selectFeature,
  feature => feature.state,
);

export const selectConfig = createSelector(
  selectGeneralFeature,
  feature => feature.config,
);

export const selectPlayers = createSelector(
  selectGeneralFeature,
  general => get(general, ['game_instance', 'players'], []) as Player[],
);

export const selectLoadedChunks = createSelector(
  selectGeneralFeature,
  feature => feature.loaded_chunks
);

const selectExpressionContext = createSelector(
  selectUser,
  selectConfig,
  selectGameState,
  selectPlayers,
  selectLoadedChunks,
  (user, conf, state, players, loaded_chunks) => {
    return createArenaExpressionContext({
      conf,
      state,
      players,
      self: players?.find(player => player.user === user?.id),
      loaded_modules: loaded_chunks
    } as any);
  }
);

export const selectCommonGameStore = createSelector(
  selectConfig,
  selectExpressionContext,
  (config, context) => ({ config, context }) as CommonGameStore
);

export const selectGameInstance = createSelector(
  selectGeneralFeature,
  feature => feature.game_instance,
);

export const selectGameConfig = createSelector(
  selectGeneralFeature,
  feature => feature.config,
);

export const selectGame = createSelector(
  selectGeneralFeature,
  feature => feature.game,
);

export const isDownloadingGameData = createSelector(
  selectGameInstance,
  selectGameConfig,
  selectGame,
  (instance, config, game) => !instance || !config || !game
);

export const isDownloadingGameMenuData = createSelector(
  selectGameConfig,
  selectGame,
  (config, game) => {
    return !config || !game;
  }
);