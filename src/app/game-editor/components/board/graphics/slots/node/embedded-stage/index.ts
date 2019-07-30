import { RenderFunction, createElement, composePoints, DynamicSprite } from "@app/render-kit";
import { Stage, Slot, Style, ImageAsset } from "@app/game-mechanics";

export type Props = {
    style: Style;
    selected: boolean;
    stage: Stage;
    slots: Slot[];
    image: ImageAsset;
}

const EmbeddedStage: RenderFunction<Props> = ({ stage, style, selected, image }) => {
    return createElement('fragment', {},
        createElement('rectangle', {
            button: true,
            points: composePoints(style.points),
            styles: {
                strokeThickness: selected ? 5 : style.strokeThickness,
                strokeColor: style.strokeColor,
                x: 0,
                y: 0,
                width: style.width + 10,
                height: style.height + 35,
                borderRadius: 5,
                radius: style.width
            }
        }),
        image ? createElement(DynamicSprite, {
            image: image.image, styles: {
                x: 5,
                y: 5,
                width: style.width,
                height: style.height,
            }
        }) : null,
        createElement('text', {
            value: stage.name, styles: {
                x: 0,
                y: -25,
            }, textStyle: {
                fontSize: 18,
                stroke: '#141619',
                fill: '#141619'
            }
        }),
    );
};

export default EmbeddedStage;