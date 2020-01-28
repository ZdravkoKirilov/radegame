import { Stage, RuntimeSlot, Style } from "../../entities";
import { Memo, createElement, calculateScaling, DynamicSprite, CompositeType } from "@app/render-kit";

export type StageSlotProps = {
    stage: Stage;
    slots: RuntimeSlot[];
    childType: CompositeType<{ data: RuntimeSlot }>;
    style: Style;
    stageImage: string;
};

export const StageSlot = Memo<StageSlotProps>(({ stage, slots, childType, style, stageImage }) => {
    slots = slots || [];
    const nodes = slots.map(slot => {
        return createElement('container', { styles: { x: slot.x, y: slot.y }, key: slot.id },
            createElement(childType, { data: slot }),
        );
    });

    return createElement('container', {
        styles: {
            scale: calculateScaling(
                [Number(style.width), Number(style.height)],
                [Number(stage.width), Number(stage.height)]),
        }
    },
        createElement(DynamicSprite, {
            image: stageImage,
            styles: {
                x: 0,
                y: 0,
                width: stage.width,
                height: stage.height,
            },
            zOrder: 2,
        }),
        createElement('collection', { zOrder: 1 }, nodes),
    );
});