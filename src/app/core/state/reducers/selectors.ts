import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoreFeature } from "./core";

export const selectCoreFeature = createFeatureSelector<CoreFeature>('core');

export const selectUser = createSelector(
    selectCoreFeature,
    core => core.user
);


