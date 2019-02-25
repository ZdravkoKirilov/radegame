import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FEATURE_NAME } from "../config";
import { CatalogFeatureState } from "./shape";
import { selectGameId } from "@app/shared";

const selectFeature = createFeatureSelector<CatalogFeatureState>(FEATURE_NAME);

export const getGames = createSelector(
    selectFeature,
    feature => feature.items ? Object.values(feature.items) : []
);

export const getGame = createSelector(
    selectFeature,
    selectGameId,
    (feature, gameId) => {
        return feature.items[gameId];
    }
);

export const getImages = createSelector(
    selectFeature,
    feature => feature.images,
);