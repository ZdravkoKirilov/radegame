import { createFeatureSelector } from '@ngrx/store';
import { FEATURE_NAME } from '../../utils/config';
import { GameEditorFeature } from '.';

export const selectFeature = createFeatureSelector<GameEditorFeature>(FEATURE_NAME);
