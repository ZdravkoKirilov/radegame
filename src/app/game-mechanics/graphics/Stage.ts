import { RuntimeSlot, Style, RuntimeImageFrame, RuntimeStage } from "../entities";
import { Memo, createElement, calculateScaling, RzElement } from "@app/render-kit";
import { FrameRendererProps, FrameRenderer } from "./Frame";

export type StageRendererProps = {
    stage: RuntimeStage;
    slots: RuntimeSlot[];
    frame: RuntimeImageFrame;
    renderChild: (slot: RuntimeSlot) => RzElement;
    renderFrameAsStage: (stage: RuntimeStage) => RzElement;
    style: Style;
};

export const StageRenderer = Memo<StageRendererProps>(({ stage, slots, renderChild, renderFrameAsStage, style, frame }) => {
    slots = slots || [];
    const nodes = slots.map(slot => {
        return createElement('container', { key: slot.id },
            renderChild(slot),
        );
    });

    return createElement('container', {
        styles: {
            scale: calculateScaling(
                [Number(style.width), Number(style.height)],
                [Number(stage.width), Number(stage.height)]
            ),
        }
    },
        frame ? createElement<FrameRendererProps>(FrameRenderer, {
            frame, renderStage: renderFrameAsStage,
        }) : null,
        createElement('collection', { styles: { z_order: 1 } }, nodes),
    );
});