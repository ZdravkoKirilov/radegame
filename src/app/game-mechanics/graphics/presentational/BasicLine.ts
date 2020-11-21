import { Shape, Style } from "../../entities";
import { createElement, LineProps } from "@app/render-kit";

export type BasicLineNodeProps = {
    style: Style;
    shape: Shape;
}

const BasicLineNode: any = ({ style, shape }: any) => {

    return createElement<LineProps>('line', {
        styles: {
            stroke_thickness: style.stroke_thickness,
            stroke_color: style.stroke_color,
            x: style.x || 0,
            y: style.y || 0,
        },
        points: shape.points.map((point: any) => {
            return [Number(point.x), Number(point.y)]
        }),
    });
};

export default BasicLineNode; 