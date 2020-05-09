import { createElement, RzElementPrimitiveProps, StatefulComponent, RzTransitionProps, RzTransition, } from "@app/render-kit";
import { Dictionary } from "@app/shared";

import NodeFactory, { NodeFactoryProps } from './Factory';
import StaticWidget, { StaticWidgetProps } from "./StaticWidget";
import { RuntimeWidget, RuntimeWidgetNode, RuntimeNodeHandler, RuntimeTransition, RuntimeNodeLifecycle } from "../../entities";
import { ExpressionContext } from "../../models";
import { AddedStoreProps, connectToStore } from "../../hocs";
import { GiveAndUseContext, WithNodeLifecycles } from "../../mixins";
import { assignHandlers } from "../../helpers/event-handlers";
import { selectWidgetNodesSync, selectWidgetFrameSync, selectNodeStyleSync, selectChildPropsSync } from "../../helpers/reusable-selectors";
import { WidgetRendererProps, WidgetRenderer } from "../presentational";
import { selectNodeHandlers, CommonGameStore, selectExpressionContext, selectNodeTransitions, selectNodeLifecycles, selectRuntimeWidget } from "../../helpers/common-selectors";

export type EnhancedWidgetNodeProps = {
    data: RuntimeWidgetNode;
    fromParent: any;
}

type StoreProps = {
    widget: RuntimeWidget;
    handlers: RuntimeNodeHandler[];
    context: ExpressionContext;
    transitions: RuntimeTransition[];
    lifecycles: RuntimeNodeLifecycle[];
};

type Props = EnhancedWidgetNodeProps & StoreProps & AddedStoreProps;

type State = { animated: Dictionary };

@GiveAndUseContext
@WithNodeLifecycles
class EnhancedWidgetNode extends StatefulComponent<Props, State> {
    state: State = { animated: {} };

    render() {
        const self = this;
        const { data, widget, handlers, context, transitions, dispatch } = this.props;
        const childProps = selectChildPropsSync(data, self);
        const { animated } = this.state;
        const style = selectNodeStyleSync(data, self);
        const frame = selectWidgetFrameSync(widget, context, self);
        const nodes = selectWidgetNodesSync(widget, context, self);
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
                widget, nodes: nodes, style: styleWithTransitionOverrides, frame,
                renderChild: (node: RuntimeWidgetNode) => {
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
                },
                renderFrame: widget => createElement<StaticWidgetProps>(StaticWidget, { widget, style, fromParent: childProps }),
            }),
        );
    }
};

const mapStateToProps = (state: CommonGameStore, ownProps: EnhancedWidgetNodeProps): StoreProps => ({
    widget: selectRuntimeWidget(ownProps.data.board)(state),
    handlers: selectNodeHandlers(ownProps.data)(state),
    context: selectExpressionContext(state),
    transitions: selectNodeTransitions(ownProps.data)(state),
    lifecycles: selectNodeLifecycles(ownProps.data)(state),
});

export default connectToStore(mapStateToProps)(EnhancedWidgetNode);