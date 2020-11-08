import { createSelector } from '@ngrx/store';
import { values } from 'lodash';
import { Omit } from 'simplytyped';

import { ConnectedEntities, FormDefinition } from '@app/dynamic-forms';
import { Widget, Module, Sandbox, toSetupId, toModuleId, toWidgetId, toNodeId, toSandboxId, WidgetNodeId, WidgetNode, ModularEntity, VersionedEntity, NestedEntity, GameEntityParser } from '@app/game-mechanics';
import { ROUTER_PARAMS, selectRouterFeature, selectRouteData, arrayFromMap, toDictionary } from '@app/shared';

import { EntityFeature, StoreEntity } from '../reducers';
import { StoreKey, STORE_KEYS } from '../../utils';
import { selectGame } from './games';
import { selectFeature } from './common';

type CustomRouteData = {
  form: FormDefinition<ModularEntity | VersionedEntity | NestedEntity>;
  modularEntity: Pick<GameEntityParser<ModularEntity, unknown, unknown>, 'fromUnknown'>;
  versionedEntity: Pick<GameEntityParser<VersionedEntity, unknown, unknown>, 'fromUnknown'>;
  storeSlice: StoreKey;
}

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
  selectRouteData<CustomRouteData>(),
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

export const getModularEntityParser = createSelector(
  selectRouteData<CustomRouteData>(),
  data => {
    return data?.modularEntity;
  }
);

export const getVersionedEntityParser = createSelector(
  selectRouteData<CustomRouteData>(),
  data => {
    return data?.versionedEntity;
  }
);

const selectModularEntityId = createSelector(
  selectRouterFeature,
  router => router.state.params[ROUTER_PARAMS.MODULAR_ENTITY_ID] as ModularEntity['id']
);

const selectVersionedEntityId = createSelector(
  selectRouterFeature,
  router => router.state.params[ROUTER_PARAMS.VERSIONED_ENTITY_ID] as VersionedEntity['id']
);

const selectNestedEntityId = createSelector(
  selectRouterFeature,
  router => router.state.params[ROUTER_PARAMS.NESTED_ENTITY_ID]
);

const selectStoreSlice = createSelector(
  selectRouteData<CustomRouteData>(),
  routeData => routeData.storeSlice
)

export const selectModularEntity = createSelector(
  selectModularEntityId,
  selectStoreSlice,
  selectForm,
  (id, slice, form) => {
    const storeSlice = form[slice];
    return storeSlice.byId.get(id as any) as ModularEntity // TODO: something is wrong :(
  }
);

export const selectVersionedEntity = createSelector(
  selectVersionedEntityId,
  selectStoreSlice,
  selectForm,
  (id, slice, form) => {
    const storeSlice = form[slice];
    return storeSlice.byId.get(id as any) as VersionedEntity // TODO: something is wrong :(
  }
);

