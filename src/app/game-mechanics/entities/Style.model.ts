import { BaseModel } from "./Base.model";

export type Style = BaseModel & Partial<{
    opacity: number;
    border_radius: number;
    rotation: number;
    skew: number;

    width: number;
    height: number;

    stroke_color: number;
    stroke_thickness: number;
    background_color: number;

    font_size: number;
    font_family: string;
    font_style: FontStyle;

    x: number;
    y: number;
}>;

export const FONT_STYLES = {
    bold: 'bold',
    italic: 'italic',
    normal: 'normal',
} as const;

export type FontStyle = keyof typeof FONT_STYLES;