import isFunction from 'lodash/isFunction';

import {
  StatefulComponent, createElement, RzElement, RzElementPrimitiveProps
} from "@app/render-kit";

import { RuntimeWidget, RuntimeWidgetNode, Widget, Style } from "../../entities";
import { ExpressionContext } from "../../models";
import {  CommonGameStore, selectRuntimeWidget, selectExpressionContext, combineStyles } from "../../helpers";
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

  render(): any {
    const { runtimeWidget, renderChild, renderFrame, fromParent, style } = this.props;
    const nodes = {}; // selectWidgetNodesSync(runtimeWidget, context, self);
    const frame = {}; // selectWidgetFrameSync(runtimeWidget, context, self);
    const customRenderFunc = runtimeWidget?.render;
    const widgetStyle = combineStyles(runtimeWidget as any);

    return (
      isFunction(customRenderFunc) ? customRenderFunc({ widget: runtimeWidget, component: this }) : createElement<WidgetRendererProps>(
        WidgetRenderer as any,
        {
          renderChild: renderChild || defaultChildRenderFunc(fromParent as any) as any, nodes: nodes as any, frame,
          widget: runtimeWidget,
          style: style || { width: widgetStyle.width, height: widgetStyle.height } as Style,
          renderFrame: renderFrame || defaultFrameRenderFunc(fromParent as any) as any,
        }
      )
    ) as any
  }
}

const mapStateToProps = (state: CommonGameStore, ownProps: RootWidgetProps): StoreProps => ({
  runtimeWidget: selectRuntimeWidget(ownProps.widget)(state),
  context: selectExpressionContext(state),
});

export const RootWidget = connectToStore(mapStateToProps)(_RootWidget as any);

export const defaultChildRenderFunc = (childProps: {}) => (node: RuntimeWidgetNode) => {
  const childNodeStyle = {} as any; // selectNodeStyleSync(node, {} as StatefulComponent) as any;

  return createElement<RzElementPrimitiveProps>(
    'container',
    {
      styles: { x: childNodeStyle.x, y: childNodeStyle.y, z: childNodeStyle.z },
      id: node.id,
      name: `node_${node.id}`
    },
    createElement<NodeFactoryProps>(NodeFactory as any, { data: node, fromParent: childProps }) as any
  );
};

export const defaultFrameRenderFunc =
  (childProps: {}) =>
    (widget: Widget) => {
      return createElement<RootWidgetProps>(RootWidget, {
        widget,
        fromParent: childProps
      });
    }
