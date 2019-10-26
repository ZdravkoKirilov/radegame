import { RenderFunction, createElement, DynamicSprite } from "@app/render-kit";
import { Style, Slot } from "../../../entities";

export type ImageSlotProps = {
    style: Style;
    image: string;
    data: Slot;
}

export const ImageSlot: RenderFunction<ImageSlotProps> = ({ style, image, data }) => {

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

export default ImageSlot;