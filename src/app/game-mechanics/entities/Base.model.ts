import { ImageFrame, ImageAsset } from "./ImageAsset.model";
import { Stage } from "./Stage.model";
import { Expression } from "./Expression.model";
import { Style } from "./Style.model";

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

export type WithBoard = Partial<{
    board: number;
}>

export type WithStyle = Partial<{
    style: string; // Expression -> Style
    style_inline: Style;
}>

export type WithState = Partial<{
    state: number | Expression;
}>;

export type WithTemplate = Partial<{
    template: number | Stage;
}>;