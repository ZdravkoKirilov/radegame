import { createElement, RzElementPrimitiveProps, StatefulComponent, } from "@app/render-kit";
import { AppState } from "@app/core";
import {
  connectToStore, Style, RuntimeWidgetNode, Widget, WidgetRenderer, WidgetRendererProps, RuntimeWidget, combineStyles,
  ExpressionContext, selectWidgetNodesSync, selectWidgetFrameSync
} from "@app/game-mechanics";
import { selectRuntimeWidget, selectExpressionContext } from "../../state";
import NodeFactory, { NodeFactoryProps } from "./Factory";

export type StaticWidgetProps = {
  widget: Widget;
  style: Style;
}

type StoreProps = {
  runtimeWidget: RuntimeWidget;
  context: ExpressionContext;
};

type Props = StaticWidgetProps & StoreProps;

class StaticWidget extends StatefulComponent<Props>  {

  render() {
    const self = this;
    const { style, runtimeWidget, context } = this.props;
    const nodes = selectWidgetNodesSync(runtimeWidget, context, self);
    const frame = selectWidgetFrameSync(runtimeWidget, context, self);

    return createElement<WidgetRendererProps>(WidgetRenderer, {
      widget: runtimeWidget, nodes: nodes, style, frame,
      renderChild: (node: RuntimeWidgetNode) => {
        const composedStyle = combineStyles(node, style);

        return createElement<RzElementPrimitiveProps>(
          'container',
          {
            styles: { x: node.x, y: node.y, z_order: composedStyle.z_order },
            id: node.id,
            name: `node_${node.id}`
          },
          createElement<NodeFactoryProps>(NodeFactory, { data: node }),
        );
      },
      renderFrame: widget => createElement<StaticWidgetProps>(StaticWidget, { widget, style }),
    });
  }
};

const mapStateToProps = (state: AppState, ownProps: StaticWidgetProps): StoreProps => ({
  runtimeWidget: selectRuntimeWidget(ownProps.widget)(state),
  context: selectExpressionContext(state),
});

export default connectToStore(mapStateToProps)(StaticWidget);