import {FEATURE_NAME} from '../../config';
import {GameEditorFeature} from '../models/GameEditorFeature';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const selectFeature = createFeatureSelector<GameEditorFeature>(FEATURE_NAME);

export const selectResources = createSelector(selectFeature, (state: GameEditorFeature) => {
    return state.form.resources.items ? Object.values(state.form.resources.items) : [];
});

