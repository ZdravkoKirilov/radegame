import { Style } from "../../entities";
import { RenderFunction, createElement, CircleProps } from "@app/render-kit";

export type BasicCircleNodeProps = {
    style: Style;
}

const BasicCircle: RenderFunction<BasicCircleNodeProps> = ({ style }: any) => {
    return createElement<CircleProps>('circle', {
        styles: {
            stroke_thickness: style.stroke_thickness,
            stroke_color: style.stroke_color,
            x: style.x,
            y: style.y,
            width: style.width,
        }
    }) as any;
};

export default BasicCircle; 