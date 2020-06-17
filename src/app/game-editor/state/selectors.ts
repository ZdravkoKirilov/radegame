import { createFeatureSelector, createSelector } from '@ngrx/store';
import { values } from 'lodash';

import { ConnectedEntities } from '@app/dynamic-forms';
import { Widget, Game, GameEntity, AllEntity, ALL_ENTITIES, Module, toGameId } from '@app/game-mechanics';
import { ROUTER_PARAMS, selectRouterFeature, selectGameId, Dictionary } from '@app/shared';

import { FEATURE_NAME } from '../utils/config';
import { GameEditorFeature } from './reducers';
import { gameSelectors } from './reducers/gamesReducer';

const selectFeature = createFeatureSelector<GameEditorFeature>(FEATURE_NAME);

const selectForm = createSelector(
  selectFeature,
  feature => feature.form
);

const selectGamesFeature = createSelector(
  selectFeature,
  feature => feature.games,
)

export const getItems = <T = GameEntity>(key: AllEntity) => createSelector(
  selectForm,
  form => form[key] && form[key].items ? values(form[key].items as Dictionary<T>) : null,
);

export const selectWidgetId = createSelector(
  selectRouterFeature,
  (routerState) => {
    return Number(routerState.state.params[ROUTER_PARAMS.WIDGET_ID]);
  }
);

export const selectNodeId = createSelector(
  selectRouterFeature,
  router => Number(router.state.params[ROUTER_PARAMS.NODE_ID])
);

export const selectModuleId = createSelector(
  selectRouterFeature,
  router => Number(router.state.params[ROUTER_PARAMS.MODULE_ID])
);

export const getActiveModule = createSelector(
  selectModuleId,
  getItems<Module>(ALL_ENTITIES.modules),
  (moduleId, modules) => modules?.find(elem => elem.id === moduleId)
);

export const selectSandboxId = createSelector(
  selectRouterFeature,
  router => Number(router.state.params[ROUTER_PARAMS.SANDBOX_ID])
);

export const getActiveSandbox = createSelector(
  selectSandboxId,
  getItems<Module>(ALL_ENTITIES.sandboxes),
  (sandboxId, sandboxes) => {
    return sandboxes?.find(elem => elem.id === sandboxId);
  }
);

export const getActiveWidget = createSelector(
  selectWidgetId,
  getItems<Widget>(ALL_ENTITIES.widgets),
  (widgetId, widgets) => {
    return widgets && widgets.find(elem => elem.id === widgetId) as Widget;
  }
);

export const getActiveNode = createSelector(
  selectNodeId,
  getActiveWidget,
  (nodeId, widget) => widget?.nodes.find(node => node.id === nodeId)
);

const selectAllGames = createSelector(
  selectGamesFeature,
  gameSelectors.selectAll,
);

export const selectGame = createSelector(
  selectAllGames,
  selectGameId,
  (games, id) => {
    return games ? games.find(elem => elem.id == toGameId(id)) : null;
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
    result.languages = []; /* TODO */
    return result;
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