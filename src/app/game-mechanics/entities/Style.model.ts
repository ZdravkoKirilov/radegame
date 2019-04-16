import { BaseModel } from "./Base.model";

export type Style = BaseModel & Partial<{
    frame: number;
    rotation: number | string;
    width: number | string;
    height: number | string;
    fill: number | string;
    strokeColor: number | string;
    strokeTickness: number | string;
}>;
