import { Stage, RuntimeSlot, Style, RuntimeImageFrame } from "../../entities";
import { Memo, createElement, calculateScaling, DynamicSprite, RzElement, SpriteProps } from "@app/render-kit";

export type StageSlotProps = {
    stage: Stage;
    slots: RuntimeSlot[];
    frame: RuntimeImageFrame;
    renderChild: (slot: RuntimeSlot) => RzElement;
    style: Style;
};

export const StageSlot = Memo<StageSlotProps>(({ stage, slots, renderChild, style, frame }) => {
    slots = slots || [];
    const nodes = slots.map(slot => {
        return createElement('container', { styles: { x: slot.x, y: slot.y }, key: slot.id },
            renderChild(slot)
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
        createElement<SpriteProps>(DynamicSprite, {
            image: frame.image.image,
            styles: {
                x: 0,
                y: 0,
                width: stage.width,
                height: stage.height,
                z_order: 2,
            },
        }),
        createElement('collection', { styles: { z_order: 1 } }, nodes),
    );
});