import { BaseModel } from "./Base.model";

export type Style = BaseModel & Partial<{
    rotation: number;
    width: number;
    height: number;

    stroke_color: number;
    stroke_thickness: number;

    background_color: number;

    font_size: number;

    opacity: number;

    border_radius: number;

    x: number;
    y: number;
}>;
