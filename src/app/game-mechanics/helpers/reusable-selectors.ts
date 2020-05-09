import get from "lodash/get";

import { withMemo } from "@app/shared";
import { StatefulComponent } from "@app/render-kit";

import { RuntimeWidget, RuntimeWidgetNode, RuntimeText } from "../entities";
import { enrichNode, enrichFrame, enrichText } from "./entity-composers";
import { ExpressionContext } from "../models";

export const selectChildPropsSync = (node: RuntimeWidgetNode, component: StatefulComponent) => {
  const handler = node.pass_to_children;
  if (typeof handler === 'function') {
    const result = handler({ node: node, component });
    return result;
  }
};

const _selectNodeStyleSync = (node: RuntimeWidgetNode, component: StatefulComponent) => {
  if (node) {
    if (node.style) {
      const style = node.style({ node: node, component });
      return style;
    }
    return node.style_inline;
  }
  return {};
};
export const selectNodeStyleSync = withMemo(_selectNodeStyleSync);


const _selectWidgetFrameSync = (widget: RuntimeWidget, context: ExpressionContext, component: StatefulComponent) => {
  if (widget) {
    const { frame_getter } = widget;
    if (typeof frame_getter === 'function') {
      const frame = frame_getter({ widget, component, });
      return enrichFrame(context.conf, context, frame);
    }
    const frame = widget.frames[0];
    return enrichFrame(context.conf, context, frame);
  }
  return null;
}
export const selectWidgetFrameSync = withMemo(_selectWidgetFrameSync);


const _selectWidgetNodesSync = (widget: RuntimeWidget, context: ExpressionContext, component: StatefulComponent) => {
  if (widget) {
    const { node_getter } = widget;
    if (typeof node_getter === 'function') {
      return node_getter({ widget, component }).map(elem => enrichNode(context.conf, context, elem));
    }
    return widget.nodes.map(elem => enrichNode(context.conf, context, elem));
  }
  return [];
};
export const selectWidgetNodesSync = withMemo(_selectWidgetNodesSync);


const _selectNodeTextSync = (node: RuntimeWidgetNode, context: ExpressionContext, component: StatefulComponent, language = 2) => {
  if (node) {
    let runtimeText: RuntimeText = null;
    if (node.display_text_inline) {
      runtimeText = enrichText(context.conf, context, node.display_text_inline);
    }
    if (node.display_text) {
      const text = node.display_text({ node: node, component });
      runtimeText = enrichText(context.conf, context, text);
    }

    if (runtimeText) {
      const translation = (runtimeText.translations || []).find(elem => elem.language === language);
      runtimeText = { ...runtimeText, computed_value: get(translation, 'value', runtimeText.default_value) };
    }
    return runtimeText;
  }
  return null;
}
export const selectNodeTextSync = withMemo(_selectNodeTextSync);