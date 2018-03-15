import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FEATURE_NAME } from '../../utils/config';
import { GameEditorFeature } from './index';

export const selectFeature = createFeatureSelector<GameEditorFeature>(FEATURE_NAME);
