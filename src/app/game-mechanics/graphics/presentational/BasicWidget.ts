import { createElement, calculateScaling, RzElement, RzElementPrimitiveProps } from "@app/render-kit";
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

export const WidgetRenderer = (props: any) => {
    const nodes = props.nodes || [];
    const children = nodes.map((node: any) => createElement('container', { key: node.id }, props.renderChild(node)));
    const widgetStyle = combineStyles(props.widget as any);
    const scale = calculateScaling(
        [Number(props.style.width), Number(props.style.height)],
        [Number(widgetStyle.width), Number(widgetStyle.height)],
    );

    return createElement<RzElementPrimitiveProps>('container', {
        styles: {
            ...props.style,
            scale,
        }
    },
        props.frame ? createElement<RzElementPrimitiveProps>(
            'container',
            { styles: { z: 2 } },
            createElement<FrameRendererProps>(FrameRenderer as any, {
                frame: props.frame,
                renderWidget: props.renderFrame,
                style: {
                    width: widgetStyle.width,
                    height: widgetStyle.height
                } as Style
            }) as any,
        ) as any : null,
        createElement<RzElementPrimitiveProps>('collection', { styles: { z: 1 } }, children) as any,
    );
};