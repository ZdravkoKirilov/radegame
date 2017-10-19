import {FEATURE_NAME} from '../../config';
import {GameEditorFeature} from '../models/index';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectFeature = createFeatureSelector<GameEditorFeature>(FEATURE_NAME);

export const selectResources = createSelector(selectFeature, (state: GameEditorFeature) => {
    return state.form.resources.items ? Object.values(state.form.resources.items) : [];
});

export const selectCharacters = createSelector(selectFeature, (state: GameEditorFeature) => {
    return state.form.characters.items ? Object.values(state.form.characters.items) : [];
});

export const selectAsset = (key) => {
    return createSelector(selectFeature, (state: GameEditorFeature) => {
        return state.assets[key];
    });
};

