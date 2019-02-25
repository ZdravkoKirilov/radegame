import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FEATURE_NAME } from "../config";
import { LobbyFeatureState } from "./shape";

const selectFeature = createFeatureSelector<LobbyFeatureState>(FEATURE_NAME);

export const getSelectedSetup = createSelector(
    selectFeature,
    feature => feature.selectedSetup,
);