import { createFeatureSelector, createSelector } from "@ngrx/store";

import { FEATURE_NAME } from "../../config";
import { ArenaState } from "../reducers";

const selectFeature = createFeatureSelector<ArenaState>(FEATURE_NAME);

export const selectGameInstance = createSelector(
    selectFeature,
    feature => feature.active_game,
);