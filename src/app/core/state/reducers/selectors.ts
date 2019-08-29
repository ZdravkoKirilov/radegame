import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoreFeature } from "./core";

export const selectCoreFeature = createFeatureSelector<CoreFeature>('core');

export const selectUser = createSelector(
    selectCoreFeature,
    core => core.user
);

export const getActiveGames = createSelector(
    selectCoreFeature,
    core => core.activeGames,
);

export const getLatestActiveGame = createSelector(
    getActiveGames,
    games => games ? games[games.length - 1] : null
);


