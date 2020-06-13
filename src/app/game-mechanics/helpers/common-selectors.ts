import { createSelector } from 'reselect';

import { GameTemplate, ExpressionContext, Game } from '../models';
import { RuntimeWidgetNode, Shape, Widget, NodeItem, WidgetNode, Text, Module } from '../entities';
import { enrichHandler, enrichLifecycle, enrichShape, enrichWidget, enrichTransition, enrichItem, enrichModule, enrichGame, enrichNode, enrichText } from './entity-composers';

export type CommonGameStore = {
  config: GameTemplate;
  context: ExpressionContext;
};

export const selectExpressionContext = (feature: CommonGameStore) => feature.context;

export const selectNodeHandlers = (node: RuntimeWidgetNode) => createSelector(
  selectExpressionContext,
  context => {
    return context.disableInteractions ? [] : node.handlers.map(node => enrichHandler(context, node));
  }
);

export const selectNodeLifecycles = (node: RuntimeWidgetNode) => createSelector(
  selectExpressionContext,
  context => {
    return context.disableInteractions ? [] : node.lifecycles.map(node => enrichLifecycle(context, node));
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
  (context) => {
    return  context.disableInteractions ? [] : node.transitions.map(transitionId => enrichTransition(
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
    const widget = attachedEntity.template;
    return widget
  }
);

export const selectRuntimeModule = (module: Module) => createSelector(
  selectExpressionContext,
  context => {
    return enrichModule(context, module);
  }
);

export const selectRuntimeItem = (item: NodeItem) => createSelector(
  selectExpressionContext,
  context => {
    return enrichItem(context, item);
  }
);

export const selectRuntimeText = (text: Text, language?: number) => createSelector(
  selectExpressionContext,
  context => {
    return enrichText(context, text, language);
  }
);

export const selectRuntimeGame = (game: Game) => createSelector(
  selectExpressionContext,
  context => enrichGame(context, game)
);