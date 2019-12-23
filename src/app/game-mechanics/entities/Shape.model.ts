import { WithStyle, BaseModel } from "./Base.model";

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