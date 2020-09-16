import { Nominal } from 'simplytyped';

import { RzStyles } from "@app/render-kit";

import { ImageFrame, ImageAsset } from "./ImageAsset.model";
import { Widget } from "./Widget.model";
import { ParamedExpressionFunc } from "./Expression.model";
import { TextFrame } from "./Text.model";
import { GameId } from '../models';
import { VersionId } from './Version.model';
import { ModuleId } from './Module.model';

export type EntityId = Nominal<string, 'id'>;

export type BaseModel<T = EntityId> = WithKeywords & Partial<{
    id: T;
    game: GameId;
    version: VersionId;

    name: string;
    description: string;
}>;

export type WithModule = Partial<{
    module: ModuleId;
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