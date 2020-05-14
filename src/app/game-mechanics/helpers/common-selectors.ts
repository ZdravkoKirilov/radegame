import { createSelector } from 'reselect';
import { GameTemplate, ExpressionContext, Game } from '../models';
import { RuntimeWidgetNode, Shape, Widget, NodeItem, Module } from '../entities';
import { enrichHandler, enrichLifecycle, enrichShape, enrichWidget, enrichTransition, enrichItem, enrichModule, enrichGame } from './entity-composers';

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
  selectConfig,
  selectExpressionContext,
  selectFeatureFlags,
  (config, context, flags) => {
    return flags.remove_handlers ? [] : node.handlers.map(node => enrichHandler(config, context, node));
  }
);

export const selectNodeLifecycles = (node: RuntimeWidgetNode) => createSelector(
  selectConfig,
  selectExpressionContext,
  selectFeatureFlags,
  (config, context, flags) => {
    return flags.remove_lifecycles ? [] : node.lifecycles.map(node => enrichLifecycle(config, context, node));
  }
);

export const selectRuntimeShape = (shape: Shape) => createSelector(
  selectConfig,
  selectExpressionContext,
  (entities, context) => {
    return enrichShape(entities, context, shape);
  }
);

export const selectRuntimeWidget = (widget: Widget) => createSelector(
  selectConfig,
  selectExpressionContext,
  (entities, context) => {
    return enrichWidget(entities, context, widget);
  }
);

export const selectNodeTransitions = (node: RuntimeWidgetNode) => createSelector(
  selectExpressionContext,
  selectFeatureFlags,
  (context, flags) => {
    return flags.remove_transitions ? [] : node.transitions.map(transitionId => enrichTransition(context.conf, context, context.conf.transitions[transitionId]))
  },
);

export const selectItemTemplate = (item: NodeItem) => createSelector(
  selectExpressionContext,
  context => {
    const runtimeItem = enrichItem(context.conf, context, item);
    const attachedEntity = runtimeItem.choice || runtimeItem.token;
    const widget: Widget = attachedEntity.template;
    return enrichWidget(context.conf, context, widget);
  }
);

export const selectRuntimeModule = (module: Module) => createSelector(
  selectExpressionContext,
  context => {
    return enrichModule(context.conf, context, module);
  }
);

export const selectRuntimeGame = (game: Game) => createSelector(
  selectExpressionContext,
  context => enrichGame(context.conf, context, game)
);