import { BaseModel } from "./Base.model";

export type Style = BaseModel & Partial<{
    frame: number;
    rotation: number;
    width: number;
    height: number;
    fill: number;
    strokeColor: number;
    strokeThickness: number;
    shape: EntityShape;
    points: string; // comma separated list of numbers

    disabled: boolean;
}>;

export const ENTITY_SHAPE = {
    circle: 'circle',
    rectangle: 'rectangle',
    ellipse: 'ellipse',
    polygon: 'polygon',
};

export type EntityShape = keyof typeof ENTITY_SHAPE;
