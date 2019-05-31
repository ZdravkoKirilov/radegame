import { RenderFunction, createElement, composePoints, DynamicSprite } from "@app/render-kit";
import { Style, Slot } from "@app/game-mechanics";

export type Props = {
    style: Style;
    selected: boolean;
    image: string;
    data: Slot;
}

const EmptySlot: RenderFunction<Props> = ({ style, selected, image, data }) => {

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
        createElement(DynamicSprite, {
            image, styles: {
                x: 5,
                y: 5,
                width: style.width,
                height: style.height,
            }
        }),
        createElement('text', {
            value: data.name, styles: {
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

export default EmptySlot;