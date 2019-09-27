import { createFeatureSelector, createSelector } from '@ngrx/store';
import { values } from 'lodash';

import { FEATURE_NAME } from '../utils/config';
import { GameEditorFeature, GameEntitiesDict } from './reducers';
import { ConnectedEntities } from '@app/dynamic-forms';
import { Stage, Game, GameEntity, AllEntity, ALL_ENTITIES } from '@app/game-mechanics';
import { ROUTER_PARAMS, selectRouterFeature, selectGameId, Dictionary } from '@app/shared';

const selectFeature = createFeatureSelector<GameEditorFeature>(FEATURE_NAME);

export const selectForm = createSelector(
    selectFeature,
    feature => feature.form
);

export const getItemById = (key: AllEntity, id: number) => createSelector(
    selectForm,
    form => form[key].items[id],
);

export const getItems = <T = GameEntity>(key: AllEntity | string) => createSelector(
    selectForm,
    form => form[key] && form[key].items ? values(form[key].items as Dictionary<T>) : null,
);

export const selectStageId = createSelector(
    selectRouterFeature,
    (routerState) => {
        return Number(routerState.state.params[ROUTER_PARAMS.STAGE_ID]);
    }
);

export const getActiveStage = createSelector(
    selectStageId,
    getItems<Stage>(ALL_ENTITIES.stages),
    (stageId, stages) => {
        return stages && stages.find(elem => elem.id === stageId) as Stage;
    }
);

export const selectGame = createSelector(
    getItems<Game>('games'),
    selectGameId,
    (games, id) => {
        return games ? games.find(elem => elem.id == id) : null;
    }
);

export const getEntities = createSelector(
    selectFeature,
    (feature) => {
        const form = feature.form || {};
        let result: ConnectedEntities;

        for (let key in form) {
            result = result || {};
            result[key] = values(form[key].items);
        }
        return result;
    }
);

export const getEntitiesDict = createSelector(
    selectForm,
    form => {
        if (form) {
            const result = {} as GameEntitiesDict;
            for (let key in form) {
                result[key] = form[key].items;
            }
            return result;
        }
    }
);

export const getEditorState = (key: AllEntity) => createSelector(
    selectFeature,
    feature => feature.form[key].showEditor
);

export const getSelectedEntity = (key: AllEntity) => createSelector(
    selectFeature,
    feature => feature.form[key].selectedEntity
);