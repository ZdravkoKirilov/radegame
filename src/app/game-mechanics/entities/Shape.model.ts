import { WithStyle, BaseModel } from "./Base.model";
import { Omit } from "@app/shared";
import { ParamedExpressionFunc } from "./Expression.model";
import { Style } from "./Style.model";

export type Shape = WithStyle & BaseModel & Partial<{
    type: ShapeType;
    points: ShapePoint[];
}>;

export type ShapePoint = {
    id: number;
    owner: number;
    
    x: string;
    y: string;
};

export const SHAPE_TYPES = {
    rectange: 'rectangle',
    circle: 'circle',
    polygon: 'polygon',
    ellipse: 'ellipse',
    line: 'line',
} as const;

export type ShapeType = keyof typeof SHAPE_TYPES;

export type RuntimeShape = Omit<Shape, 'style' | 'style_inline'> & {
    style: ParamedExpressionFunc<RuntimeShape, Style>;
    style_inline: Style;
};