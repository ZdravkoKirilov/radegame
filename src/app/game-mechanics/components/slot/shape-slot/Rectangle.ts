import { Shape, Style } from "../../../entities";
import { RenderFunction, createElement } from "@app/render-kit";

export type RectangleProps = {
    style: Style;
    shape: Shape;
}

const Rectangle: RenderFunction<RectangleProps> = ({ style, shape }) => {
    
    return createElement('rectangle', {
        styles: {
            stroke_thickness: style.stroke_thickness,
            stroke_color: style.stroke_color,
            background_color: style.background_color,
            x: style.x || 0,
            y: style.y || 0,
            width: Number(style.width),
            height: Number(style.height),
            border_radius: style.border_radius,
        }
    });
};

export default Rectangle; 