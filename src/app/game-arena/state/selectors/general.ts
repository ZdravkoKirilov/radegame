import { createFeatureSelector, createSelector } from "@ngrx/store";

import { FEATURE_NAME } from "../../config";
import { ArenaState } from "../reducers";
import { selectGameState } from "./game-state";

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

export const isDownloadingGameData = createSelector(
    selectGameInstance,
    selectGameConfig,
    selectGame,
    (instance, config, game) => !instance || !config || !game
);