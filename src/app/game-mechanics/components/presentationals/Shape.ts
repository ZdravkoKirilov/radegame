import { RenderFunction, createElement } from "@app/render-kit";
import { Style, Shape } from "../../entities";
import Circle, { CircleSlotProps } from "./Circle";
import Rectangle, { RectangleProps } from "./Rectangle";
import Polygon, { PolygonSlotProps } from "./Polygon";
import LineSlot, { LineSlotProps } from "./Line";
import Ellipse, { EllipseSlotProps } from "./Ellipse";

export type ShapeSlotProps = {
    style: Style;
    shape: Shape;
}

export const ShapeSlot: RenderFunction<ShapeSlotProps> = ({ style, shape }) => {

    if (shape.type === 'rectange') {
        return createElement<RectangleProps>(Rectangle, { style, shape });
    }
    if (shape.type === 'circle') {
        return createElement<CircleSlotProps>(Circle, { style, shape });
    }
    if (shape.type === 'polygon') {
        return createElement<PolygonSlotProps>(Polygon, { style, shape });
    }
    if (shape.type === 'line') {
        return createElement<LineSlotProps>(LineSlot, { style, shape });
    }
    if (shape.type === 'ellipse') {
        return createElement<EllipseSlotProps>(Ellipse, { style, shape });
    }
};