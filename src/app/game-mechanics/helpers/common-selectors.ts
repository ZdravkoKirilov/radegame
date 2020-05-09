import { createSelector } from 'reselect';
import { GameTemplate, ExpressionContext } from '../models';
import { RuntimeWidgetNode, Shape, Widget, NodeItem } from '../entities';
import { enrichHandler, enrichLifecycle, enrichShape, enrichWidget, enrichTransition, enrichItem } from './entity-composers';

export type CommonGameStore = {
  config: GameTemplate;
  context: ExpressionContext;
};

const selectConfig = (feature: CommonGameStore) => feature.config;
export const selectExpressionContext = (feature: CommonGameStore) => feature.context;

export const selectNodeHandlers = (node: RuntimeWidgetNode) => createSelector(
  selectConfig,
  selectExpressionContext,
  (config, context) => {
    return node.handlers.map(node => enrichHandler(config, context, node));
  }
);

export const selectNodeLifecycles = (node: RuntimeWidgetNode) => createSelector(
  selectConfig,
  selectExpressionContext,
  (config, context) => {
    return node.lifecycles.map(node => enrichLifecycle(config, context, node));
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
  context => {
    return node.transitions.map(transitionId => enrichTransition(context.conf, context, context.conf.transitions[transitionId]))
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