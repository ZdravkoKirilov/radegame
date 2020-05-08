import { RenderFunction, createElement } from "@app/render-kit";
import { Style, RuntimeShape } from "../entities";
import BasicCircle, { BasicCircleNodeProps } from "./BasicCircle";
import BasicRectangle, { BasicRectangleProps } from "./BasicRectangle";
import BasicPolygon, { PolygonNodeProps } from "./BasicPolygon";
import BasicLineNode, { BasicLineNodeProps } from "./BasicLine";
import BasicEllipse, { BasicEllipseNodeProps } from "./BasicEllipse";

export type BasicShapeNodeProps = {
    style: Style;
    shape: RuntimeShape;
}

export const BasicShapeNode: RenderFunction<BasicShapeNodeProps> = ({ style, shape }) => {

    if (shape.type === 'rectange') {
        return createElement<BasicRectangleProps>(BasicRectangle, { style });
    }
    if (shape.type === 'circle') {
        return createElement<BasicCircleNodeProps>(BasicCircle, { style });
    }
    if (shape.type === 'polygon') {
        return createElement<PolygonNodeProps>(BasicPolygon, { style, shape });
    }
    if (shape.type === 'line') {
        return createElement<BasicLineNodeProps>(BasicLineNode, { style, shape });
    }
    if (shape.type === 'ellipse') {
        return createElement<BasicEllipseNodeProps>(BasicEllipse, { style });
    }
};