import { ImageFrame, ImageAsset } from "./ImageAsset.model";
import { Stage } from "./Stage.model";
import { ParamedExpressionFunc } from "./Expression.model";
import { TextFrame } from "./Text.model";
import { RzStyles } from "@app/render-kit";

export type BaseModel = WithKeywords & Partial<{
    id: number;
    game: number;

    name: string;
    description: string;
}>;

export type WithKeywords = Partial<{
    keywords: string;
}>;

export type WithImage = Partial<{
    image: ImageAsset;
}>

export type WithFrames = Partial<{
    frames: ImageFrame[];
}>;

export type WithTexts = Partial<{
    texts: TextFrame[];
}>;

export type WithBoard = Partial<{
    board: number;
}>

export type WithStyle = Partial<{
    style: string; // Expression -> Style
    style_inline: RzStyles;
}>

export type WithTemplate = Partial<{
    template: number | Stage;
}>;

export type WithRuntimeStyle<T = any> = {
    style_inline: RzStyles;
    style: ParamedExpressionFunc<T, RzStyles>;
};