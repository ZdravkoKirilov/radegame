import { RuntimeWidget, RuntimeWidgetNode, WidgetRendererProps, WidgetRenderer, RuntimeImageFrame, NodeFactory, NodeFactoryProps, StaticWidgetProps, StaticWidget } from "@app/game-mechanics";
import { Memo, createElement, RzElementPrimitiveProps } from "@app/render-kit";

export type ModuleWidgetProps = {
    widget: RuntimeWidget;
    nodes: RuntimeWidgetNode[];
    frame: RuntimeImageFrame;
}

type Props = ModuleWidgetProps;

export const ModuleWidget = Memo<Props>(({ widget, nodes, frame }) => {
    return createElement<WidgetRendererProps>(
        WidgetRenderer,
        {
            renderChild: (node: RuntimeWidgetNode) => {
                return createElement<RzElementPrimitiveProps>(
                    'container',
                    { styles: { x: node.x, y: node.y } },
                    createElement<NodeFactoryProps>(
                        NodeFactory,
                        { data: node }
                    )
                )

            },
            nodes: nodes, frame, widget,
            style: { width: widget.width, height: widget.height },
            renderFrame: widget => {
                return createElement<StaticWidgetProps>(StaticWidget, {
                    widget: widget,
                    style: { width: widget.width, height: widget.height }
                });
            }
        }
    )
}, ['widget', 'nodes', 'frame']);