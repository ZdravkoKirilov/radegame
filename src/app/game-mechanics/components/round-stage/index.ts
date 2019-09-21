import { Stage, Slot, ImageAsset } from "../../entities";
import { Memo, createElement, SpriteProps } from "@app/render-kit";
import { SlotsList, Props as SlotsListProps } from "../slots";

export type RoundStageProps = {
    stage: Stage;
    image: ImageAsset;
    slots: Slot[];
}

export const RoundStage = Memo<RoundStageProps>(({ stage, image, slots }) => {

    return createElement(
        'fragment',
        null,
        createElement<SpriteProps>('sprite',
            {
                image: image.image,
                styles: {
                    x: 0,
                    y: 0,
                    width: stage.width,
                    height: stage.height,
                },
            }
        ),
        createElement<SlotsListProps>(
            SlotsList,
            { slots }
        ),
    );
}, ['stage']);