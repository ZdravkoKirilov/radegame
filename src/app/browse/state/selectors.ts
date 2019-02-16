import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "@app/core";
import { FEATURE_NAME } from "../config";
import { BrowseFeatureState } from "./shape";
import { selectGameId } from "@app/shared";

const selectFeature = createFeatureSelector<BrowseFeatureState>(FEATURE_NAME);

export const getGames = createSelector(
    selectFeature,
    feature => Object.values(feature.items)
);

export const getGame = createSelector(
    selectFeature,
    selectGameId,
    (feature, gameId) => {
        return feature.items[gameId];
    }
);