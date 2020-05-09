import { createElement, RzElementPrimitiveProps, StatefulComponent, RzTransitionProps, RzTransition, } from "@app/render-kit";
import { Dictionary } from "@app/shared";

import NodeFactory, { NodeFactoryProps } from './Factory';
import StaticWidget, { StaticWidgetProps } from "./StaticWidget";
import { RuntimeWidget, RuntimeWidgetNode, RuntimeNodeHandler, RuntimeTransition, RuntimeNodeLifecycle } from "../../entities";
import { ExpressionContext } from "../../models";
import { AddedStoreProps, connectToStore } from "../../hocs";
import { GiveAndUseContext, WithNodeLifecycles } from "../../mixins";
import { WidgetRendererProps, WidgetRenderer } from "../presentational";
import { selectWidgetNodesSync, selectWidgetFrameSync, selectChildPropsSync, selectNodeStyleSync, assignHandlers, combineStyles, CommonGameStore, selectItemTemplate, selectNodeHandlers, selectExpressionContext, selectNodeTransitions, selectNodeLifecycles } from "../../helpers";

export type EnhancedItemNodeProps = {
  data: RuntimeWidgetNode;
  fromParent: any;
}

type StoreProps = {
  widget: RuntimeWidget;
  context: ExpressionContext;
  handlers: RuntimeNodeHandler[];
  transitions: RuntimeTransition[];
  lifecycles: RuntimeNodeLifecycle[];
};

type Props = EnhancedItemNodeProps & StoreProps & AddedStoreProps;

type State = { animated: Dictionary };
@GiveAndUseContext
@WithNodeLifecycles
class EnhancedItemNode extends StatefulComponent<Props, State> {
  state: State = { animated: {} };

  render() {
    const self = this;
    const { widget, context, data, handlers, transitions, dispatch } = this.props;
    const { animated } = this.state;
    const nodes = selectWidgetNodesSync(widget, context, self);
    const frame = selectWidgetFrameSync(widget, context, self);
    const style = selectNodeStyleSync(data, self);
    const childProps = selectChildPropsSync(data, self);
    const styleWithTransitionOverrides = { ...style, ...animated };

    return createElement<RzElementPrimitiveProps>(
      'container',
      {
        ...assignHandlers({ self, dispatch, handlers, context }),
        styles: { z_order: style.z_order }
      },
      createElement<RzTransitionProps>(
        RzTransition,
        {
          transitions,
          context: {
            component: self,
            props: this.props,
            state: this.state,
          },
          onUpdate: (value: Dictionary) => this.setState({ animated: value }),
          onDone: transition => {
            if (transition.onDone) {
              transition.onDone({
                component: self,
                transition,
                styles: styleWithTransitionOverrides,
              });
            }
          }
        },
      ),
      createElement<WidgetRendererProps>(WidgetRenderer, {
        widget, nodes: nodes, style, frame,
        renderChild: (node: RuntimeWidgetNode) => {
          const composedStyle = combineStyles(node, style);

          return createElement<RzElementPrimitiveProps>(
            'container',
            {
              styles: { x: node.x, y: node.y, z_order: composedStyle.z_order },
              id: node.id,
              name: `node_${node.id}`
            },
            createElement<NodeFactoryProps>(NodeFactory, { data: node, fromParent: childProps })
          );
        },
        renderFrame: widget => createElement<StaticWidgetProps>(StaticWidget, { widget, style, fromParent: childProps }),
      }),
    );
  }
};

const mapStateToProps = (state: CommonGameStore, ownProps: EnhancedItemNodeProps): StoreProps => ({
  widget: selectItemTemplate(ownProps.data.item)(state),
  handlers: selectNodeHandlers(ownProps.data)(state),
  context: selectExpressionContext(state),
  transitions: selectNodeTransitions(ownProps.data)(state),
  lifecycles: selectNodeLifecycles(ownProps.data)(state),
});

export default connectToStore<Props, CommonGameStore>(mapStateToProps)(EnhancedItemNode);