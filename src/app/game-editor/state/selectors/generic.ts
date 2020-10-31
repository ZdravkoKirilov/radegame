import { createSelector } from '@ngrx/store';
import { values } from 'lodash';

import { ConnectedEntities } from '@app/dynamic-forms';
import { Widget, StoreKey, STORE_KEYS, Module, Sandbox, toSetupId, toModuleId, toWidgetId, toNodeId, toSandboxId, toLifecycleId, toHandlerId, WidgetNodeId, WidgetNode } from '@app/game-mechanics';
import { ROUTER_PARAMS, selectRouterFeature, selectRouteData, arrayFromMap, toDictionary } from '@app/shared';

import { selectFeature } from './common';
import { EntityFeature, StoreEntity } from '../reducers';
import { selectGame } from './games';

export const selectForm = createSelector(
  selectFeature,
  feature => feature.form
);

const selectFormSlice = (key: StoreKey) => createSelector(
  selectForm,
  form => form[key]
);

export const selectModuleId = createSelector(
  selectRouterFeature,
  routerState => toModuleId(routerState.state.params[ROUTER_PARAMS.MODULE_ID])
);

export const getItems = <T extends StoreEntity>(key: StoreKey) => createSelector(
  selectForm,
  form => arrayFromMap<T>(form[key].byId as Map<any, any>),
);

export const getIndexedNodes = createSelector(
  getItems('widgets'),
  widgets => widgets.reduce((allNodes, currentWidget: Widget) => {
    allNodes = {
      ...allNodes,
      ...toDictionary(currentWidget.nodes),
    };
    return allNodes;
  }, {} as Map<WidgetNodeId, WidgetNode>)
);

export const getEntityByIdAndType = (id: StoreEntity['id'], key: StoreKey) => createSelector(
  selectFormSlice(key),
  slice => slice?.byId[id]
);

export const selectWidgetId = createSelector(
  selectRouterFeature,
  (routerState) => {
    return toWidgetId(routerState.state.params[ROUTER_PARAMS.WIDGET_ID]);
  }
);

export const selectNodeId = createSelector(
  selectRouterFeature,
  router => toNodeId(router.state.params[ROUTER_PARAMS.NODE_ID])
);

export const getActiveModule = createSelector(
  selectModuleId,
  getItems<Module>(STORE_KEYS.modules),
  (moduleId, modules) => {
    const module = modules?.find(elem => elem.id == moduleId);
    return module;
  }
);

export const selectSandboxId = createSelector(
  selectRouterFeature,
  router => toSandboxId(router.state.params[ROUTER_PARAMS.SANDBOX_ID])
);

export const getActiveSandbox = createSelector(
  selectSandboxId,
  getItems<Sandbox>(STORE_KEYS.sandboxes),
  (sandboxId, sandboxes) => {
    return sandboxes?.find(elem => elem.id === sandboxId);
  }
);

export const getActiveWidget = createSelector(
  selectWidgetId,
  getItems<Widget>(STORE_KEYS.widgets),
  (widgetId, widgets) => {
    return widgets && widgets.find(elem => elem.id === widgetId);
  }
);

export const getActiveNode = createSelector(
  selectNodeId,
  getActiveWidget,
  (nodeId, widget) => widget?.nodes.find(node => node.id === nodeId)
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
    return form.setups.byId.get(setupId);
  }
);

export const selectEntityId = createSelector(
  selectRouterFeature,
  router => router.state.params[ROUTER_PARAMS.ENTITY_ID] as StoreEntity['id']
);

export const selectNestedEntityId = createSelector(
  selectRouterFeature,
  router => router.state.params[ROUTER_PARAMS.NESTED_ENTITY_ID]
);

const selectLifecycleId = createSelector(
  selectRouterFeature,
  (routerState) => {
    return toLifecycleId(routerState.state.params[ROUTER_PARAMS.NODE_LIFECYCLE_ID]);
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
    return toHandlerId(routerState.state.params[ROUTER_PARAMS.NODE_HANDLER_ID]);
  }
);

export const getActiveHandler = createSelector(
  selectHandlerId,
  getActiveNode,
  (handlerId, node) => node?.handlers.find(handler => handler.id === handlerId)
);