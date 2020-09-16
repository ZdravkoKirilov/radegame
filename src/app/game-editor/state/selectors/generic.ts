import { createSelector } from '@ngrx/store';
import { values } from 'lodash';

import { ConnectedEntities } from '@app/dynamic-forms';
import { Widget, GameEntity, AllEntity, ALL_ENTITIES, Module, Sandbox, toSetupId, Setup, toModuleId, EntityId } from '@app/game-mechanics';
import { ROUTER_PARAMS, selectRouterFeature, Dictionary, selectRouteData } from '@app/shared';

import { selectFeature } from './common';
import { EntityFeature } from '../reducers';

const selectForm = createSelector(
  selectFeature,
  feature => feature.form
);

const selectFormSlice = (key: AllEntity) => createSelector(
  selectForm,
  form => form[key] as EntityFeature
);

export const selectModuleId = createSelector(
  selectRouterFeature,
  routerState => toModuleId(routerState.state.params[ROUTER_PARAMS.MODULE_ID])
);

export const getItems = <T = GameEntity>(key: AllEntity) => createSelector(
  selectForm,
  form => values(form[key]?.byId as Dictionary<T>) || [],
);

export const getEntityByIdAndType = (id: EntityId, key: AllEntity) => createSelector(
  selectFormSlice(key),
  slice => slice?.byId[id]
);

export const selectWidgetId = createSelector(
  selectRouterFeature,
  (routerState) => {
    return Number(routerState.state.params[ROUTER_PARAMS.WIDGET_ID]) as any;
  }
);

export const selectNodeId = createSelector(
  selectRouterFeature,
  router => Number(router.state.params[ROUTER_PARAMS.NODE_ID]) as any
);

export const getActiveModule = createSelector(
  selectModuleId,
  getItems<Module>(ALL_ENTITIES.modules),
  (moduleId, modules) => {
    const module = modules?.find(elem => elem.id == moduleId);
    return module;
  }
);

export const selectSandboxId = createSelector(
  selectRouterFeature,
  router => Number(router.state.params[ROUTER_PARAMS.SANDBOX_ID]) as any
);

export const getActiveSandbox = createSelector(
  selectSandboxId,
  getItems<Sandbox>(ALL_ENTITIES.sandboxes),
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

export const getEntityForm = createSelector(
  selectRouteData,
  data => {
    return data?.form;
  }
);

export const getEntityType = createSelector(
  selectRouteData,
  data => {
    return data?.entityType;
  }
);

export const getNestedEntityType = createSelector(
  selectRouteData,
  data => {
    return data?.nestedEntityType;
  }
);

const getSetupId = createSelector(
  selectRouterFeature,
  routerState => toSetupId(routerState.state.params[ROUTER_PARAMS.SETUP_ID])
);

export const getSetup = createSelector(
  getSetupId,
  selectForm,
  (setupId, form) => {
    return form.setups.byId[setupId] as Setup;
  }
);

export const selectEntityId = createSelector(
  selectRouterFeature,
  router => router.state.params[ROUTER_PARAMS.ENTITY_ID] as EntityId
);

export const selectNestedEntityId = createSelector(
  selectRouterFeature,
  router => router.state.params[ROUTER_PARAMS.NESTED_ENTITY_ID]
);
