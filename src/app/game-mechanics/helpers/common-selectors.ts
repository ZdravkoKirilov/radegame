import { createSelector } from 'reselect';

import { GameTemplate, ExpressionContext, Game } from '../models';
import { RuntimeWidgetNode, Shape, Widget, NodeItem, WidgetNode, Text, Module, NodeHandler, NodeLifecycle, Transition } from '../entities';

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

export const selectNodeTransitions = (node: RuntimeWidgetNode) => createSelector(
  selectExpressionContext,
  (context) => {
    return context.disableInteractions ? [] : node.transitions
      .map(transitionId => Transition.toRuntime(context, context.conf.transitions[transitionId]))
  },
);

export const selectItemTemplate = (item: NodeItem) => createSelector(
  selectExpressionContext,
  context => {
    const runtimeItem = NodeItem.toRuntime(context, item);
    const attachedEntity = runtimeItem.choice || runtimeItem.token;
    const widget = attachedEntity.template;
    return widget
  }
);

export const selectRuntimeModule = (module: Module) => createSelector(
  selectExpressionContext,
  context => {
    return Module.toRuntime(context, module);
  }
);

export const selectRuntimeItem = (item: NodeItem) => createSelector(
  selectExpressionContext,
  context => {
    return NodeItem.toRuntime(context, item);
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