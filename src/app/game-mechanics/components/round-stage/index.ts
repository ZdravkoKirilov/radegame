import { Stage, Slot, ImageAsset } from "../../entities";
import { Memo, createElement, SpriteProps } from "@app/render-kit";

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
        createElement(
            'text',
            {
                value: stage.name,
                styles: {
                    x: 100,
                    y: 125,
                },
                textStyle: {
                    fontSize: 18,
                    stroke: '#141619',
                    fill: '#141619'
                }
            }
        ),
    );
}, ['stage']);