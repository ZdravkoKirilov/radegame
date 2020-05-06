import { RuntimeSlot, Style, RuntimeImageFrame, RuntimeWidget, Widget } from "../entities";
import { Memo, createElement, calculateScaling, RzElement, RzElementPrimitiveProps } from "@app/render-kit";
import { FrameRendererProps, FrameRenderer } from "./Frame";

export type WidgetRendererProps = {
    widget: RuntimeWidget;
    slots: RuntimeSlot[];
    frame: RuntimeImageFrame;
    renderChild: (slot: RuntimeSlot) => RzElement;
    renderFrame: (widget: Widget, style: Style) => RzElement;
    style: Style;
};

export const WidgetRenderer = Memo<WidgetRendererProps>(({ widget, slots, renderChild, renderFrame, style, frame }) => {
    slots = slots || [];
    const nodes = slots.map(slot => {
        return createElement('container', { key: slot.id },
            renderChild(slot),
        );
    });

    return createElement('container', {
        styles: {
            ...style,
            scale: calculateScaling(
                [Number(style.width), Number(style.height)],
                [Number(widget.width), Number(widget.height)],
            ),
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
        createElement('collection', { styles: { z_order: 1 } }, nodes),
    );
});