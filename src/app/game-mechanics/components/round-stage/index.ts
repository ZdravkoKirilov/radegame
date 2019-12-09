import { Stage, RuntimeSlot, ImageAsset } from "../../entities";
import { Memo, createElement, SpriteProps, DynamicSprite } from "@app/render-kit";
import { SlotsList, Props as SlotsListProps } from "../slots";

export type RoundStageProps = {
    stage: Stage;
    image: ImageAsset;
    slots: RuntimeSlot[];
}

export const RoundStage = Memo<RoundStageProps>(({ stage, image, slots }) => {
    return createElement(
        'fragment',
        null,
        createElement<SpriteProps>(DynamicSprite,
            {
                image: image.image,
                styles: {
                    x: 0,
                    y: 0,
                    width: stage.width,
                    height: stage.height,
                },
                zOrder: 2
            }
        ),
        createElement<SlotsListProps>(
            SlotsList,
            { slots }
        ),
    );
}, ['stage', 'image', 'slots']);