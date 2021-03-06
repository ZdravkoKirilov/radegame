import isFunction from 'lodash/isFunction';

import { StatefulComponent } from "@app/render-kit";

import { RuntimeWidget, RuntimeWidgetNode, Module, WidgetNode, ImageFrame } from "../entities";
import { ExpressionContext, RuntimeGame } from "../models";
import { findFirstEntityBy } from "./misc";

export const selectChildPropsSync = (node: RuntimeWidgetNode, component: StatefulComponent) => {
  const handler = node.pass_to_children;
  if (typeof handler === 'function') {
    const result = handler({ node: node, component });
    return result;
  }
};

export const selectModuleFromGameSync = (game: RuntimeGame, context: ExpressionContext) => {
  if (game && isFunction(game.get_active_module)) {
    const moduleName = game.get_active_module();
    return moduleName ? findFirstEntityBy<Module>(context.conf, 'modules', { name: moduleName }) : null;
  }
  return null;
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
export const selectNodeStyleSync = _selectNodeStyleSync;


const _selectWidgetFrameSync = (widget: RuntimeWidget, context: ExpressionContext, component: StatefulComponent) => {
  if (widget) {
    const { frame_getter } = widget;
    if (typeof frame_getter === 'function') {
      const frame = frame_getter({ widget, component, });
      return ImageFrame.toRuntime(context, frame);
    }
    const frame = widget.frames[0];
    return ImageFrame.toRuntime(context, frame);
  }
  return null;
}
export const selectWidgetFrameSync = _selectWidgetFrameSync;


const _selectWidgetNodesSync = (widget: RuntimeWidget, context: ExpressionContext, component: StatefulComponent) => {
  if (widget) {
    const { node_getter } = widget;
    if (typeof node_getter === 'function') {
      return node_getter({ widget, component }).map(elem => WidgetNode.toRuntime(context, elem));
    }
    return widget.nodes.map(elem => WidgetNode.toRuntime(context, elem));
  }
  return [];
};
export const selectWidgetNodesSync = _selectWidgetNodesSync;


const _selectNodeTextSync = (node: RuntimeWidgetNode, context: ExpressionContext, component: StatefulComponent, language = 2) => {
  if (node) {
    return node?.display_text_inline || node?.display_text({ node: node, component });
  }
  return null;
}
export const selectNodeTextSync = _selectNodeTextSync;