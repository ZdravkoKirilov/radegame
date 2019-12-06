import { ImageFrame, ImageAsset } from "./ImageAsset.model";
import { Stage } from "./Stage.model";
import { Expression } from "./Expression.model";
import { Style } from "./Style.model";

export type BaseModel = Partial<{
    id: number;
    game: number;

    name: string;
    description: string;
}>;

export type WithImage = Partial<{
    image: ImageAsset;
}>

export type WithDisplayName = Partial<{
    display_name: string;
}>;

export type WithDone = Partial<{
    done: number | Expression;
}>;

export type WithFrames = Partial<{
    frames: ImageFrame[];
}>;

export type WithBoard = Partial<{
    board: number | Stage;
}>

export type WithStakes = Partial<{
    passes: number | Expression;
    fails: number | Expression;
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