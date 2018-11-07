import { createFeatureSelector, createSelector } from '@ngrx/store';
import values from 'lodash/values';

import { FEATURE_NAME } from '../utils/config';
import { GameEditorFeature, EntityForm } from './reducers';
import { FormKey, formKeys } from './form-keys';
import { AppState, selectStageId } from '@app/core';
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

export const getItems = <T = any>(key: FormKey) => createSelector<AppState, GameEditorFeature, EntityForm, T>(
    selectForm,
    form => form[key] && form[key].items ? values(form[key].items) : null,
);

export const getEntities = createSelector(
    selectFeature,
    feature => {
        const form = feature.form || {};
        let result: ConnectedEntities;

        for (let key in form) {
            result = result || {};
            result[key] = values(form[key].items);
        }
        return result;
    }
);

export const getActiveStage = createSelector(
    selectStageId,
    getItems(formKeys.STAGES),
    (stageId, stages) => {
        return stages && stages.find(elem => elem.id === stageId);
    }
);