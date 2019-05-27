import { BaseModel } from "./Base.model";

export type Style = BaseModel & Partial<{
    frame: number;
    rotation: number;
    width: number;
    height: number;
    fill: number;
    strokeColor: number;
    strokeThickness: number;
    interpolation: string; // 89,555,244,999 etc.
    easing: EasingConfig;
    shape: EntityShape;
    points: string; // comma separated list of numbers
}>;

export const EASING_CONFIG = {
    LINEAR: 'LINEAR',
};

export type EasingConfig = keyof typeof EASING_CONFIG;

export const ENTITY_SHAPE = {
    circle: 'circle',
    rectangle: 'rectangle',
    ellipse: 'ellipse',
    polygon: 'polygon',
};

export type EntityShape = keyof typeof ENTITY_SHAPE;
