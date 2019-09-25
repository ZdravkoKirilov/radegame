import { RenderFunction, createElement, DynamicSprite } from "@app/render-kit";
import { Style, Slot } from "../../../../entities";

export type Props = {
    style: Style;
    image: string;
    data: Slot;
}

const EmptySlot: RenderFunction<Props> = ({ style, image, data }) => {
 
    return createElement('container', {},
        image ? createElement(DynamicSprite, {
            image, styles: {
                x: 5,
                y: 15,
                width: style.width,
                height: style.height,
            }
        }) : null,
        createElement('text', {
            value: data.name, styles: {
                x: 0,
                y: 0,
            }, textStyle: {
                fontSize: 18,
                stroke: '#141619',
                fill: '#141619'
            }
        }),
    );
};

export default EmptySlot;