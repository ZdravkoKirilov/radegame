import { Shape, Style } from "../../entities";
import { RenderFunction, createElement, CircleProps } from "@app/render-kit";

export type CircleSlotProps = {
    style: Style;
    shape: Shape;
}

const Circle: RenderFunction<CircleSlotProps> = ({ style, shape }) => {
    return createElement<CircleProps>('circle', {
        styles: {
            stroke_thickness: style.stroke_thickness,
            stroke_color: style.stroke_color,
            x: style.x,
            y: style.y,
            width: style.width,
            interactive: style.interactive,
        }
    });
};

export default Circle; 