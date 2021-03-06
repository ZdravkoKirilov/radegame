import { RenderFunction, createElement, PolygonProps } from "@app/render-kit";

import { Shape, Style } from "../../entities";

export type PolygonNodeProps = {
    style: Style;
    shape: Shape;
}

const BasicPolygon: RenderFunction<PolygonNodeProps> = ({ style, shape }) => {

    return createElement<PolygonProps>('polygon', {
        styles: {
            stroke_thickness: style.stroke_thickness,
            stroke_color: style.stroke_color,
            x: style.x || 0,
            y: style.y || 0,
        },
        points: shape.points.map(point => {
            return [Number(point.x), Number(point.y)]
        }),
    });
};

export default BasicPolygon; 