import { BaseModel } from "./Base.model";

export type Style = BaseModel & Partial<{
    frame: number;
    rotation: number;
    width: number;
    height: number;
    stroke_color: number;
    stroke_thickness: number;

    opacity: number;

    hidden: boolean;
}>;
