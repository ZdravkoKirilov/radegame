import get from "lodash/get";

import { RuntimeStage, RuntimeSlot, ImageAsset } from "@app/game-mechanics";
import { Memo, createElement, SpriteProps, DynamicSprite } from "@app/render-kit";
import { SlotsList, Props as SlotsListProps } from "../slots";

export type RoundStageProps = {
    stage: RuntimeStage;
    image: ImageAsset;
    slots: RuntimeSlot[];
}

export const RoundStage = Memo<RoundStageProps>(({ stage, image, slots }) => {
    return createElement(
        'fragment',
        null,
        createElement<SpriteProps>(DynamicSprite,
            {
                image: get(image, 'image'),
                styles: {
                    x: 0,
                    y: 0,
                    width: stage.width,
                    height: stage.height,
                    z_order: 2,
                },
            }
        ),
        createElement<SlotsListProps>(
            SlotsList,
            { slots }
        ),
    );
}, ['stage', 'image', 'slots']);