import { createFeatureSelector, createSelector } from '@ngrx/store';
import values from 'lodash/values';

import { FEATURE_NAME } from '../utils/config';
import { GameEditorFeature, EntityForm } from './reducers';
import { FormKey } from './form-keys';
import { AppState } from '@app/core';
import { ConnectedEntities } from '@app/dynamic-forms';

const selectFeature = createFeatureSelector<GameEditorFeature>(FEATURE_NAME);

export const selectForm = createSelector<AppState, GameEditorFeature, EntityForm>(
    selectFeature,
    feature => feature.form
);

export const getItemById = (key: FormKey, id: number) => createSelector(
    selectForm,
    form => form[key].items[id],
);

export const getItems = (key: FormKey) => createSelector(
    selectForm,
    form => form[key] && form[key].items ? values(form[key].items) : [],
);

export const getEntities = createSelector(
    selectFeature,
    feature => {
        const form = feature.form || {};
        const result = <ConnectedEntities>{};

        for (let key in form) {
            result[key] = values(form[key].items);
        }
        return result;
    }
);