import {  Style } from "../../entities";
import { RenderFunction, createElement, EllipseProps } from "@app/render-kit";

export type EllipseSlotProps = {
    style: Style;
}

const Ellipse: RenderFunction<EllipseSlotProps> = ({ style }) => {
    
    return createElement<EllipseProps>('ellipse', {
        styles: {
            stroke_thickness: style.stroke_thickness,
            stroke_color: style.stroke_color,
            x: style.x,
            y: style.x,
            width: style.width,
            height: style.height
        }
    });
};

export default Ellipse; 