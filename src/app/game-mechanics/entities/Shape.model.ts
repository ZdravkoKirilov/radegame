import { WithStyle } from "./Base.model";
import { Expression } from "./Expression.model";

export type Shape = WithStyle & Partial<{
    id: number;
    game: number;

    name: string;

    type: ShapeType;
    points: ShapePoint[];

    construct_by: number | Expression;
    construct_by_inline: string;
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
    star: 'star',
} as const;

export type ShapeType = keyof typeof SHAPE_TYPES;