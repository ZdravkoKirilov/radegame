import { createSelector } from 'reselect';

import { GameTemplate, ExpressionContext, Game } from '../models';
import { RuntimeWidgetNode, Shape, Widget, NodeItem, Module, WidgetNode } from '../entities';
import { enrichHandler, enrichLifecycle, enrichShape, enrichWidget, enrichTransition, enrichItem, enrichModule, enrichGame, enrichNode } from './entity-composers';

export type CommonGameStore = {
  config: GameTemplate;
  context: ExpressionContext;
  remove_transitions?: boolean;
  remove_handlers?: boolean;
  remove_lifecycles?: boolean;
};

const selectConfig = (feature: CommonGameStore) => feature.config;
export const selectExpressionContext = (feature: CommonGameStore) => feature.context;
const selectFeatureFlags = (feature: CommonGameStore) => {
  const { remove_handlers, remove_lifecycles, remove_transitions } = feature;
  return { remove_handlers, remove_lifecycles, remove_transitions };
}

export const selectNodeHandlers = (node: RuntimeWidgetNode) => createSelector(
  selectExpressionContext,
  selectFeatureFlags,
  (context, flags) => {
    return flags.remove_handlers ? [] : node.handlers.map(node => enrichHandler(context, node));
  }
);

export const selectNodeLifecycles = (node: RuntimeWidgetNode) => createSelector(
  selectExpressionContext,
  selectFeatureFlags,
  (context, flags) => {
    return flags.remove_lifecycles ? [] : node.lifecycles.map(node => enrichLifecycle(context, node));
  }
);

export const selectRuntimeShape = (shape: Shape) => createSelector(
  selectExpressionContext,
  context => {
    return enrichShape(context, shape);
  }
);

export const selectRuntimeWidget = (widget: Widget) => createSelector(
  selectExpressionContext,
  context => {
    return enrichWidget(context, widget);
  }
);

export const selectRuntimeNode = (node: WidgetNode) => createSelector(
  selectExpressionContext,
  context => enrichNode(context, node)
);

export const selectNodeTransitions = (node: RuntimeWidgetNode) => createSelector(
  selectExpressionContext,
  selectFeatureFlags,
  (context, flags) => {
    return flags.remove_transitions ? [] : node.transitions.map(transitionId => enrichTransition(
      context,
      context.conf.transitions[transitionId])
    )
  },
);

export const selectItemTemplate = (item: NodeItem) => createSelector(
  selectExpressionContext,
  context => {
    const runtimeItem = enrichItem(context, item);
    const attachedEntity = runtimeItem.choice || runtimeItem.token;
    const widget: Widget = attachedEntity.template;
    return enrichWidget(context, widget);
  }
);

export const selectRuntimeModule = (module: Module) => createSelector(
  selectExpressionContext,
  context => {
    return enrichModule(context, module);
  }
);

export const selectRuntimeGame = (game: Game) => createSelector(
  selectExpressionContext,
  context => enrichGame(context, game)
);