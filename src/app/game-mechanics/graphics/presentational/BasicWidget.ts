import { Memo, createElement, calculateScaling, RzElement, RzElementPrimitiveProps } from "@app/render-kit";
import { combineStyles } from "@app/game-mechanics";

import { FrameRendererProps, FrameRenderer } from "./BasicFrame";
import { RuntimeWidgetNode, Style, RuntimeWidget, Widget } from "../../entities";

export type WidgetRendererProps = {
    widget: RuntimeWidget;
    nodes: RuntimeWidgetNode[];
    frame: any;
    renderChild: (node: RuntimeWidgetNode) => RzElement;
    renderFrame: (widget: Widget, style: Style) => RzElement;
    style: Style;
};

export const WidgetRenderer = Memo<WidgetRendererProps>(({ widget, nodes, renderChild, renderFrame, style, frame }) => {
    nodes = nodes || [];
    const children = nodes.map(node => createElement('container', { key: node.id }, renderChild(node)));
    const widgetStyle = combineStyles(widget as any);
    const scale = calculateScaling(
        [Number(style.width), Number(style.height)],
        [Number(widgetStyle.width), Number(widgetStyle.height)],
    );

    return createElement<RzElementPrimitiveProps>('container', {
        styles: {
            ...style,
            scale,
        }
    },
        frame ? createElement<RzElementPrimitiveProps>(
            'container',
            { styles: { z: 2 } },
            createElement<FrameRendererProps>(FrameRenderer, {
                frame,
                renderWidget: renderFrame,
                style: {
                    width: widgetStyle.width,
                    height: widgetStyle.height
                } as Style
            }),
        ) : null,
        createElement<RzElementPrimitiveProps>('collection', { styles: { z: 1 } }, children),
    );
});