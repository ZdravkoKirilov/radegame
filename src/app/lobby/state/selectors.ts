import { createFeatureSelector, createSelector } from "@ngrx/store";
import { FEATURE_NAME } from "../config";
import { LobbyFeatureState, gameAdapter } from "./shape";
import { selectGameId } from "@app/shared";

const selectFeature = createFeatureSelector<LobbyFeatureState>(FEATURE_NAME);
const selectGames = createSelector(
    selectFeature,
    feature => feature.games,
);
const fromGameAdapter = gameAdapter.getSelectors();

export const getFormState = createSelector(
    selectFeature,
    feature => feature.meta.showForm,
);

const getGameEntities = createSelector(
    selectGames,
    fromGameAdapter.selectEntities,
);

export const getSelectedGame = createSelector(
    selectGameId,
    getGameEntities,
    (id, entities) => entities[id],
);