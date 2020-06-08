import {
  StatefulComponent, createElement, RzElement, RzElementPrimitiveProps
} from "@app/render-kit";

import { RuntimeWidget, RuntimeWidgetNode, Widget, Style } from "../../entities";
import { ExpressionContext } from "../../models";
import { selectWidgetNodesSync, selectWidgetFrameSync, CommonGameStore, selectRuntimeWidget, selectExpressionContext, selectNodeStyleSync } from "../../helpers";
import { WidgetRendererProps, WidgetRenderer } from "../presentational";
import { connectToStore } from "../../hocs";
import NodeFactory, { NodeFactoryProps } from "./Factory";

type Props = RootWidgetProps & StoreProps;

export type RootWidgetProps = {
  widget: Widget;
  fromParent?: {};

  renderChild?: (node: RuntimeWidgetNode) => RzElement;
  renderFrame?: (widget: Widget, style: Style) => RzElement;
  style?: Style;
}

type StoreProps = {
  runtimeWidget: RuntimeWidget;
  context: ExpressionContext;
}

class _RootWidget extends StatefulComponent<Props> {

  render() {
    const self = this;
    const { context, runtimeWidget, renderChild, renderFrame, fromParent, style } = this.props;
    const nodes = selectWidgetNodesSync(runtimeWidget, context, self);
    const frame = selectWidgetFrameSync(runtimeWidget, context, self);
    const customRenderFunc = runtimeWidget?.render;

    return (
      customRenderFunc ? customRenderFunc({ widget: runtimeWidget, component: this }) : createElement<WidgetRendererProps>(
        WidgetRenderer,
        {
          renderChild: renderChild || defaultChildRenderFunc(fromParent), nodes, frame,
          widget: runtimeWidget,
          style: style || { width: runtimeWidget.width, height: runtimeWidget.height },
          renderFrame: renderFrame || defaultFrameRenderFunc(fromParent),
        }
      )
    )
  }
}

const mapStateToProps = (state: CommonGameStore, ownProps: RootWidgetProps): StoreProps => ({
  runtimeWidget: selectRuntimeWidget(ownProps.widget)(state),
  context: selectExpressionContext(state),
});

export const RootWidget = connectToStore(mapStateToProps)(_RootWidget);

export const defaultChildRenderFunc = (childProps: {}) => (node: RuntimeWidgetNode) => {
  const childNodeStyle = selectNodeStyleSync(node, {} as StatefulComponent);

  return createElement<RzElementPrimitiveProps>(
    'container',
    {
      styles: { x: node.x, y: node.y, z_order: childNodeStyle.z_order },
      id: node.id,
      name: `node_${node.id}`
    },
    createElement<NodeFactoryProps>(NodeFactory, { data: node, fromParent: childProps })
  );
};

export const defaultFrameRenderFunc =
  (childProps: {}) =>
    (widget: Widget) =>
      createElement<RootWidgetProps>(RootWidget, {
        widget,
        style: { width: widget.width, height: widget.height },
        fromParent: childProps
      });
