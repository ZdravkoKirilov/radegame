import { createFeatureSelector, createSelector } from '@ngrx/store';
import { values } from 'lodash';

import { FEATURE_NAME } from '../utils/config';
import { GameEditorFeature } from './reducers';
import { FormKey, formKeys } from './form-keys';
import { ConnectedEntities } from '@app/dynamic-forms';
import { Stage, Game, GameEntity, GameEntityList, GameEntitiesDict } from '@app/game-mechanics';
import { ROUTER_PARAMS, selectRouterFeature, selectGameId, Dictionary } from '@app/shared';

const selectFeature = createFeatureSelector<GameEditorFeature>(FEATURE_NAME);

export const selectForm = createSelector(
    selectFeature,
    feature => feature.form
);

export const getItemById = (key: FormKey, id: number) => createSelector(
    selectForm,
    form => form[key].items[id],
);

export const getItems = <T = GameEntity>(key: FormKey | string) => createSelector(
    selectForm,
    form => form[key] && form[key].items ? values(form[key].items as Dictionary<GameEntity>) : null,
);

export const selectStageId = createSelector(
    selectRouterFeature,
    (routerState) => {
        return Number(routerState.state.params[ROUTER_PARAMS.STAGE_ID]);
    }
);

export const getActiveStage = createSelector(
    selectStageId,
    getItems<Stage>(formKeys.stages),
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
    selectGame,
    (feature, game) => {
        const form = feature.form || {};
        let result: ConnectedEntities;

        for (let key in form) {
            result = result || {};
            result[key] = values(form[key].items);
        }
        result.setups = game ? game.setups || [] : [];
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

export const getEditorState = (key: FormKey) => createSelector(
    selectFeature,
    feature => feature.form[key].showEditor
);

export const getSelectedEntity = (key: FormKey) => createSelector(
    selectFeature,
    feature => feature.form[key].selectedEntity
);