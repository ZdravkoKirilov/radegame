import { createSelector } from '@ngrx/store';
import { values } from 'lodash';

import { ConnectedEntities, FormDefinition } from '@app/dynamic-forms';
import {
  Widget, toModuleId, WidgetNodeId, WidgetNode,
  ModularEntity, VersionedEntity, NestedEntity, GameEntityParser, EntityWithChildren, AnimationStep, AnimationStepId, SonataStep, SonataStepId, TokenNode, TokenNodeId, Translation, TranslationId, NodeHandlerId, NodeHandler, NodeLifecycleId, NodeLifecycle, GameLanguageId, GameLanguage, ShapePoint, ShapePointId, Animation, Sonata, Token,
  Text,
  Shape
} from '@app/game-mechanics';
import { ROUTER_PARAMS, selectRouterFeature, selectRouteData } from '@app/shared';

import { EntityFeature, StoreEntity } from '../reducers';
import { StoreKey, STORE_KEYS } from '../../utils';
import { selectGame } from './games';
import { selectFeature } from './common';

export const DERIVED_STORE_KEYS = {
  'token-nodes': 'token-nodes',
  translations: 'translations',
  'animation-steps': 'animation-steps',
  'sonata-steps': 'sonata-steps',
  'node-lifecycles': 'node-lifecycles',
  'node-handlers': 'node-handlers',
  'widget-nodes': 'widget-nodes',
  'game-languages': 'game-languages',
  'shape-points': 'shape-points',
} as const;

type DerivedStoreKey = keyof typeof DERIVED_STORE_KEYS;

export type EditorRoutesData = Partial<{
  form: FormDefinition<ModularEntity | VersionedEntity | NestedEntity>;
  modularEntity: Pick<GameEntityParser<ModularEntity, unknown, unknown>, 'fromUnknown'>;
  versionedEntity: Pick<GameEntityParser<VersionedEntity, unknown, unknown>, 'fromUnknown'>;
  nestedEntity: Pick<GameEntityParser<NestedEntity, unknown, unknown>, 'fromUnknown'>;
  storeSlice: StoreKey | DerivedStoreKey;
}>

export const selectForm = createSelector(
  selectFeature,
  feature => feature.form
);

export const selectModuleId = createSelector(
  selectRouterFeature,
  routerState => toModuleId(routerState.state.params[ROUTER_PARAMS.MODULE_ID])
);

export const getItems = <T extends StoreEntity>(key: StoreKey) => createSelector(
  selectForm,
  form => Object.values(form[key].byId) as T[],
);

export const getIndexedNodes = createSelector(
  getItems('widgets'),
  widgets => widgets.reduce((allNodes, currentWidget: Widget) => {
    currentWidget.nodes.forEach(node => {
      allNodes[node.id] = node;
    });
    return allNodes;
  }, {} as Record<WidgetNodeId, WidgetNode>
  )
);

const selectNestedEntities = createSelector(
  selectForm,
  selectGame,
  getIndexedNodes,
  (form, game, nodes) => {

    const animationSteps = Object.values<Animation>(form.animations.byId).reduce((total, item) => {
      item.steps.forEach(step => total[step.id] = step);
      return total;
    }, {} as Record<AnimationStepId, AnimationStep>);

    const sonataSteps = Object.values<Sonata>(form.sonatas.byId).reduce((total, item) => {
      item.steps.forEach(step => total[step.id] = step);
      return total;
    }, {} as Record<SonataStepId, SonataStep>);

    const tokenNodes = Object.values<Token>(form.tokens.byId).reduce((total, item) => {
      item.nodes.forEach(node => total[node.id] = node);
      return total;
    }, {} as Record<TokenNodeId, TokenNode>);

    const translations = Object.values<Text>(form.texts.byId).reduce((total, item) => {
      item.translations.forEach(translation => total[translation.id] = translation);
      return total;
    }, {} as Record<TranslationId, Translation>);

    const points = Object.values<Shape>(form.shapes.byId).reduce((total, item) => {
      item.points.forEach(point => total[point.id] = point);
      return total;
    }, {} as Record<ShapePointId, ShapePoint>);

    const handlers = Object.values<WidgetNode>(nodes).reduce((total, item) => {
      item.handlers.forEach(handler => total[handler.id] = handler);
      return total;
    }, {} as Record<NodeHandlerId, NodeHandler>);

    const lifecycles = Object.values<WidgetNode>(nodes).reduce((total, item) => {
      item.lifecycles.forEach(lifecycle => total[lifecycle.id] = lifecycle);
      return total;
    }, {} as Record<NodeLifecycleId, NodeLifecycle>);

    const languages = game.languages.reduce((total, item) => {
      total[item.id] = item;
      return total;
    }, {} as Record<GameLanguageId, GameLanguage>);

    return {
      [DERIVED_STORE_KEYS["widget-nodes"]]: { byId: nodes },
      [DERIVED_STORE_KEYS["animation-steps"]]: { byId: animationSteps },
      [DERIVED_STORE_KEYS["sonata-steps"]]: { byId: sonataSteps },
      [DERIVED_STORE_KEYS["game-languages"]]: { byId: languages },
      [DERIVED_STORE_KEYS["node-handlers"]]: { byId: handlers },
      [DERIVED_STORE_KEYS["node-lifecycles"]]: { byId: lifecycles },
      [DERIVED_STORE_KEYS["shape-points"]]: { byId: points },
      [DERIVED_STORE_KEYS["token-nodes"]]: { byId: tokenNodes },
      [DERIVED_STORE_KEYS.translations]: { byId: translations },
    } as const;

  }
);

export const getEntityForm = createSelector(
  selectRouteData<EditorRoutesData>(),
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

export const getModularEntityParser = createSelector(
  selectRouteData<EditorRoutesData>(),
  data => {
    return data?.modularEntity;
  }
);

export const getVersionedEntityParser = createSelector(
  selectRouteData<EditorRoutesData>(),
  data => {
    return data?.versionedEntity;
  }
);

export const getNestedEntityParser = createSelector(
  selectRouteData<EditorRoutesData>(),
  data => {
    return data?.nestedEntity;
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
  router => router.state.params[ROUTER_PARAMS.NESTED_ENTITY_ID] as NestedEntity['id']
);

export const selectParentEntityId = createSelector(
  selectRouterFeature,
  router => router.state.params[ROUTER_PARAMS.PARENT_ENTITY_ID] as EntityWithChildren['id']
);

const selectStoreSlice = createSelector(
  selectRouteData<EditorRoutesData>(),
  routeData => routeData.storeSlice
)

export const selectModularEntity = createSelector(
  selectModularEntityId,
  selectStoreSlice,
  selectForm,
  (id, slice, form) => {
    const storeSlice = form[slice];
    return storeSlice.byId[id] as ModularEntity // TODO: something is wrong :(
  }
);

export const selectVersionedEntity = createSelector(
  selectVersionedEntityId,
  selectStoreSlice,
  selectForm,
  (id, slice, form) => {
    const storeSlice = form[slice];
    return storeSlice.byId[id] as VersionedEntity // TODO: something is wrong :(
  }
);

export const selectNestedEntity = createSelector(
  selectNestedEntityId,
  selectStoreSlice,
  selectNestedEntities,
  (id, slice, form) => {
    const storeSlice = form[slice];
    return storeSlice.byId[id] as NestedEntity;
  }
);

