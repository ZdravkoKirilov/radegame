import { createElement, RzElementPrimitiveProps, StatefulComponent, } from "@app/render-kit";
import { AppState } from "@app/core";
import {
  connectToStore, Style, RuntimeWidgetNode, Widget, WidgetRenderer, WidgetRendererProps, RuntimeWidget,
  selectWidgetFrameSync, selectWidgetNodesSync, ExpressionContext,
} from "@app/game-mechanics";
import { selectRuntimeWidget, selectExpressionContext } from "../../state";
import NodeFactory, { NodeFactoryProps } from "./Factory";

export type StaticWidgetProps = {
  widget: Widget;
  style: Style;
  fromParent?: any;
}

type StoreProps = {
  runtimeWidget: RuntimeWidget;
  context: ExpressionContext;
};

type Props = StaticWidgetProps & StoreProps;

export class StaticWidget extends StatefulComponent<Props> {

  render() {
    const self = this;
    const { runtimeWidget, context, style, fromParent } = this.props;

    const frame = selectWidgetFrameSync(runtimeWidget, context, self);
    const nodes = selectWidgetNodesSync(runtimeWidget, context, self);

    return createElement<WidgetRendererProps>(WidgetRenderer, {
      widget: runtimeWidget, nodes: nodes, style, frame,
      renderChild: (node: RuntimeWidgetNode) => {

        return createElement<RzElementPrimitiveProps>(
          'container',
          {
            styles: { x: node.x, y: node.y },
            id: node.id,
            name: `node_${node.id}`
          },
          createElement<NodeFactoryProps>(NodeFactory, { data: node, fromParent }),
        );
      },
      renderFrame: widget => createElement<StaticWidgetProps>(StaticWidget, { widget, style, fromParent }),
    });
  }
};

const mapStateToProps = (state: AppState, ownProps: StaticWidgetProps): StoreProps => ({
  runtimeWidget: selectRuntimeWidget(ownProps.widget)(state),
  context: selectExpressionContext(state),
});

export default connectToStore(mapStateToProps)(StaticWidget);