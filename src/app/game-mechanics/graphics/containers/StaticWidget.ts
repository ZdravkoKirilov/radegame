import { createElement, RzElementPrimitiveProps, StatefulComponent, } from "@app/render-kit";

import NodeFactory, { NodeFactoryProps } from './Factory';
import { RuntimeWidget, RuntimeWidgetNode, Widget, Style } from "../../entities";
import { ExpressionContext } from "../../models";
import { connectToStore } from "../../hocs";
import { selectWidgetNodesSync, selectWidgetFrameSync, selectExpressionContext, selectRuntimeWidget, CommonGameStore } from "../../helpers";
import { WidgetRendererProps, WidgetRenderer } from "../presentational";

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

class StaticWidgetClass extends StatefulComponent<Props> {

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

const mapStateToProps = (state: CommonGameStore, ownProps: StaticWidgetProps): StoreProps => ({
  runtimeWidget: selectRuntimeWidget(ownProps.widget)(state),
  context: selectExpressionContext(state),
});

export const StaticWidget = connectToStore(mapStateToProps)(StaticWidgetClass);
export default StaticWidget;