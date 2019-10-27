import { ImageFrame, ImageAsset } from "./ImageAsset.model";
import { InteractiveEntityType } from "./types";

export type BaseModel = Partial<{
    id: number;
    game: number;

    name: string;
    description: string;
}>;

export type WithImage = Partial<{
    image: number;
}>

export type WithType = Partial<{
    entity_type: InteractiveEntityType;
}>

export type WithDisplayName = Partial<{
    display_name: string;
}>;

export type WithDone = Partial<{
    done: number; // Expression
}>;

export type WithFrames = Partial<{
    frames: ImageFrame[];
}>;

export type WithKeywords = Partial<{
    keywords: number[];
}>;

export type WithBoard = Partial<{
    board: number; // Stage
}>

export type WithStakes = Partial<{
    passes: number; // Expression
    fails: number; // Expression
}>

export type WithStyle = Partial<{
    style: number; // Style
    style_inline: string;
}>

export type WithState = Partial<{
    state: number; // Expression 
}>;