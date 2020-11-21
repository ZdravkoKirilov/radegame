import { createElement } from "@app/render-kit";
import { Style, Shape } from "../../entities";
import BasicCircle, { BasicCircleNodeProps } from "./BasicCircle";
import BasicRectangle, { BasicRectangleProps } from "./BasicRectangle";
import BasicPolygon, { PolygonNodeProps } from "./BasicPolygon";
import BasicLineNode, { BasicLineNodeProps } from "./BasicLine";
import BasicEllipse, { BasicEllipseNodeProps } from "./BasicEllipse";

export type BasicShapeNodeProps = {
    style: Style;
    shape: Shape;
}

export const BasicShapeNode: any = ({ style, shape }: any) => {

    if (shape.type === 'rectange') {
        return createElement<BasicRectangleProps>(BasicRectangle as any, { style });
    }
    if (shape.type === 'circle') {
        return createElement<BasicCircleNodeProps>(BasicCircle as any, { style });
    }
    if (shape.type === 'polygon') {
        return createElement<PolygonNodeProps>(BasicPolygon as any, { style, shape });
    }
    if (shape.type === 'line') {
        return createElement<BasicLineNodeProps>(BasicLineNode as any, { style, shape });
    }
    if (shape.type === 'ellipse') {
        return createElement<BasicEllipseNodeProps>(BasicEllipse as any, { style });
    }
};