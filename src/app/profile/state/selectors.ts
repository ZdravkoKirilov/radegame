import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProfileFeature } from "./reducers";
import { FEATURE_NAME } from "../config";

export const selectProfileFeature = createFeatureSelector<ProfileFeature>(FEATURE_NAME);

export const selectUser = createSelector(
    selectProfileFeature,
    profile => profile.user
);