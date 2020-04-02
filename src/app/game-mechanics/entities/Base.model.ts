import { ImageFrame, ImageAsset } from "./ImageAsset.model";
import { Stage } from "./Stage.model";
import { ParamedExpressionFunc } from "./Expression.model";
import { Style } from "./Style.model";
import { Text, TextFrame } from "./Text.model";

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
    style_inline: Style;
}>

export type WithTemplate = Partial<{
    template: number | Stage;
}>;

export type WithRuntimeStyle<T = any> = {
    style_inline: Style;
    style: ParamedExpressionFunc<T, Style>;
};