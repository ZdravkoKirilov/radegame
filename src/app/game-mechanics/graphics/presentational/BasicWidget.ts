import { RuntimeWidgetNode, Style, RuntimeImageFrame, RuntimeWidget, Widget } from "../../entities";
import { Memo, createElement, calculateScaling, RzElement, RzElementPrimitiveProps } from "@app/render-kit";
import { FrameRendererProps, FrameRenderer } from "./BasicFrame";

export type WidgetRendererProps = {
    widget: RuntimeWidget;
    nodes: RuntimeWidgetNode[];
    frame: RuntimeImageFrame;
    renderChild: (node: RuntimeWidgetNode) => RzElement;
    renderFrame: (widget: Widget, style: Style) => RzElement;
    style: Style;
};

export const WidgetRenderer = Memo<WidgetRendererProps>(({ widget, nodes, renderChild, renderFrame, style, frame }) => {
    nodes = nodes || [];
    const children = nodes.map(node => {
        return createElement('container', { key: node.id },
            renderChild(node),
        );
    });
    const scale = calculateScaling(
        [Number(style.width), Number(style.height)],
        [Number(widget.width), Number(widget.height)],
    );

    return createElement<RzElementPrimitiveProps>('container', {
        styles: {
            ...style,
            scale,
        }
    },
        frame ? createElement<RzElementPrimitiveProps>(
            'container',
            { styles: { z_order: 2 } },
            createElement<FrameRendererProps>(FrameRenderer, {
                frame,
                renderWidget: renderFrame,
                style: {
                    width: widget.width,
                    height: widget.height
                }
            }),
        ) : null,
        createElement('collection', { styles: { z_order: 1 } }, children),
    );
});