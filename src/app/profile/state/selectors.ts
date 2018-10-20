import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProfileFeature } from "./reducers";

export const selectProfileFeature = createFeatureSelector<ProfileFeature>('profile');

export const selectUser = createSelector(
    selectProfileFeature,
    profile => profile.user
);