import { createElement, RzElementPrimitiveProps, StatefulComponent, } from "@app/render-kit";
import { AppState } from "@app/core";
import {
    RuntimeWidgetNode, Style, connectToStore, WidgetRendererProps, WidgetRenderer, RuntimeWidget,
    combineStyles, ExpressionContext, selectWidgetNodesSync, selectWidgetFrameSync, selectNodeStyleSync
} from "@app/game-mechanics";
import { selectRuntimeWidget, selectExpressionContext } from '../../state';

import NodeFactory, { NodeFactoryProps } from './Factory';
import StaticWidget, { StaticWidgetProps } from "./StaticWidget";

export type EnhancedWidgetNodeProps = {
    data: RuntimeWidgetNode;
}

type StoreProps = {
    widget: RuntimeWidget;
    context: ExpressionContext;
};

type Props = EnhancedWidgetNodeProps & StoreProps;

class EnhancedWidgetNode extends StatefulComponent<Props> {

    render() {
        const self = this;
        const { widget, context, data } = this.props;
        const nodes = selectWidgetNodesSync(widget, context, self);
        const frame = selectWidgetFrameSync(widget, context, self);
        const style = selectNodeStyleSync(data, self);

        return createElement<WidgetRendererProps>(WidgetRenderer, {
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
                    createElement<NodeFactoryProps>(NodeFactory, { data: node })
                );
            },
            renderFrame: widget => createElement<StaticWidgetProps>(StaticWidget, { widget, style }),
        });
    }
};

const mapStateToProps = (state: AppState, ownProps: EnhancedWidgetNodeProps): StoreProps => ({
    widget: selectRuntimeWidget(ownProps.data.board)(state),
    context: selectExpressionContext(state),
});

export default connectToStore(mapStateToProps)(EnhancedWidgetNode);