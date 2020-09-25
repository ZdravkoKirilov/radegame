import { createSelector } from 'reselect';

import { GameTemplate, ExpressionContext, Game } from '../models';
import { RuntimeWidgetNode, Shape, Widget, WidgetNode, Text, Module, NodeHandler, NodeLifecycle } from '../entities';

export type CommonGameStore = {
  config: GameTemplate;
  context: ExpressionContext;
};

export const selectExpressionContext = (feature: CommonGameStore) => feature.context;

export const selectNodeHandlers = (node: RuntimeWidgetNode) => createSelector(
  selectExpressionContext,
  context => {
    return context.disableInteractions ? [] : node.handlers.map(node => NodeHandler.toRuntime(context, node));
  }
);

export const selectNodeLifecycles = (node: RuntimeWidgetNode) => createSelector(
  selectExpressionContext,
  context => {
    return context.disableInteractions ? [] : node.lifecycles.map(node => NodeLifecycle.toRuntime(context, node));
  }
);

export const selectRuntimeShape = (shape: Shape) => createSelector(
  selectExpressionContext,
  context => {
    return Shape.toRuntime(context, shape);
  }
);

export const selectRuntimeWidget = (widget: Widget) => createSelector(
  selectExpressionContext,
  context => {
    return Widget.toRuntime(context, widget);
  }
);

export const selectRuntimeNode = (node: WidgetNode) => createSelector(
  selectExpressionContext,
  context => WidgetNode.toRuntime(context, node)
);

export const selectRuntimeModule = (module: Module) => createSelector(
  selectExpressionContext,
  context => {
    return Module.toRuntime(context, module);
  }
);

export const selectRuntimeText = (text: Text, language?: number) => createSelector(
  selectExpressionContext,
  context => {
    return Text.toRuntime(context, text, language);
  }
);

export const selectRuntimeGame = (game: Game) => createSelector(
  selectExpressionContext,
  context => Game.toRuntime(context, game)
);