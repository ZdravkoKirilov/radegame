import { BaseModel } from "./Base.model";

export type Style = BaseModel & Partial<{
    frame: number;
    rotation: number;
    width: number;
    height: number;
    strokeColor: number;
    strokeThickness: number;
}>;
