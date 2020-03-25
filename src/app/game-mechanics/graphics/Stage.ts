import { RuntimeSlot, Style, RuntimeImageFrame, RuntimeStage, Stage } from "../entities";
import { Memo, createElement, calculateScaling, RzElement, RzElementPrimitiveProps } from "@app/render-kit";
import { FrameRendererProps, FrameRenderer } from "./Frame";

export type StageRendererProps = {
    stage: RuntimeStage;
    slots: RuntimeSlot[];
    frame: RuntimeImageFrame;
    renderChild: (slot: RuntimeSlot) => RzElement;
    renderStaticStage: (stage: Stage, style: Style) => RzElement;
    style: Style;
};

export const StageRenderer = Memo<StageRendererProps>(({ stage, slots, renderChild, renderStaticStage, style, frame }) => {
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
                [Number(stage.width), Number(stage.height)],
            ),
        }
    },
        frame ? createElement<RzElementPrimitiveProps>(
            'container',
            { styles: { z_order: 2 } },
            createElement<FrameRendererProps>(FrameRenderer, {
                frame,
                renderStage: renderStaticStage,
                style: {
                    width: stage.width,
                    height: stage.height
                }
            }),
        ) : null,
        createElement('collection', { styles: { z_order: 1 } }, nodes),
    );
});