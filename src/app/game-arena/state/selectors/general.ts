import { createFeatureSelector, createSelector } from "@ngrx/store";
import get from "lodash/get";

import { FEATURE_NAME } from "../../config";
import { ArenaState } from "../reducers";

const selectFeature = createFeatureSelector<ArenaState>(FEATURE_NAME);

export const selectGameInstance = createSelector(
    selectFeature,
    feature => feature.game_instance,
);

export const selectGameConfig = createSelector(
    selectFeature,
    feature => feature.config,
);

export const selectGame = createSelector(
    selectFeature,
    feature => feature.game,
);

export const selectPlayers = createSelector(
    selectGameInstance,
    instance => get(instance, 'players', []),
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
    (config, game) => !config || !game
);