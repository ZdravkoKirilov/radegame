import { BaseModel } from "./Base.model";

export type Style = BaseModel & Partial<{
    frame: number;
    rotation: number | string;
    width: number | string;
    height: number | string;
    fill: number | string;
    strokeColor: number | string;
    strokeTickness: number | string;
    interpolation: string; // 89,555,244,999 etc.
    easing: EasingConfig;
}>;

export const EASING_CONFIG = {
    LINEAR: 'LINEAR',
};

export type EasingConfig = keyof typeof EASING_CONFIG;
