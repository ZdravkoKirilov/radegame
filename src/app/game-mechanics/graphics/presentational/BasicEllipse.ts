import {  Style } from "../../entities";
import { RenderFunction, createElement, EllipseProps } from "@app/render-kit";

export type BasicEllipseNodeProps = {
    style: Style;
}

const BasicEllipse: RenderFunction<BasicEllipseNodeProps> = ({ style }: any) => {
    
    return createElement<EllipseProps>('ellipse', {
        styles: {
            stroke_thickness: style.stroke_thickness,
            stroke_color: style.stroke_color,
            x: style.x,
            y: style.x,
            width: style.width,
            height: style.height
        }
    }) as any;
};

export default BasicEllipse; 