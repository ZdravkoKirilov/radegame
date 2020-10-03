import { createSelector } from '@ngrx/store';
import { values } from 'lodash';

import { ConnectedEntities } from '@app/dynamic-forms';
import { Widget, GameEntity, AllEntity, ALL_ENTITIES, Module, Sandbox, toSetupId, Setup, toModuleId, EntityId, NodeLifecycleId, NodeHandlerId, WidgetNode } from '@app/game-mechanics';
import { ROUTER_PARAMS, selectRouterFeature, Dictionary, selectRouteData } from '@app/shared';

import { selectFeature } from './common';
import { EntityFeature } from '../reducers';
import { selectGame } from './games';

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
  (nodeId, widget) => widget?.nodes.find(node => node.id === nodeId) as WidgetNode
);

export const getEntityForm = createSelector(
  selectRouteData,
  data => {
    return data?.form;
  }
);

export const getEntities = createSelector(
  selectForm,
  selectGame,
  (form, game) => {
    let result: ConnectedEntities = {};
    for (let key in form) {
      const slice: EntityFeature = form[key];
      result[key] = values(slice.byId);
    }
    result.languages = game?.languages;
    return result;
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

const selectLifecycleId = createSelector(
  selectRouterFeature,
  (routerState) => {
    return String(routerState.state.params[ROUTER_PARAMS.NODE_LIFECYCLE_ID]) as NodeLifecycleId;
  }
);

export const getActiveLifecycle = createSelector(
  selectLifecycleId,
  getActiveNode,
  (lifecycleId, node) => node?.lifecycles.find(lifecycle => lifecycle.id === lifecycleId)
);

const selectHandlerId = createSelector(
  selectRouterFeature,
  (routerState) => {
    return String(routerState.state.params[ROUTER_PARAMS.NODE_HANDLER_ID]) as NodeHandlerId;
  }
);

export const getActiveHandler = createSelector(
  selectHandlerId,
  getActiveNode,
  (handlerId, node) => node?.handlers.find(handler => handler.id === handlerId)
);