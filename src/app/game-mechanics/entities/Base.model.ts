import { Nominal } from 'simplytyped';

import { RzStyles } from "@app/render-kit";

import { ImageFrame, ImageAsset } from "./ImageAsset.model";
import { Widget } from "./Widget.model";
import { ParamedExpressionFunc } from "./Expression.model";
import { TextFrame } from "./Text.model";
import { GameId } from '../models';

export type EntityId = Nominal<string, 'id'>;

export type BaseModel<T = EntityId> = WithKeywords & Partial<{
    id: T;
    game: GameId;

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
    template: number | Widget;
}>;

export type WithRuntimeStyle<T = any> = {
    style_inline?: RzStyles;
    style?: ParamedExpressionFunc<T, RzStyles>;
};