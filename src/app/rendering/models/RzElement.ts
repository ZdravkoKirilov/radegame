import { AbstractRenderEngine } from "../interfaces";
import { ComponentConstructor } from "./Component";

export interface RzElement {
    type: RzElementType;
    props: RzElementProps,
    children: RzElement[];
};

export type RzElementKey = number | string;

export type RzElementProps = Partial<{
    [key: string]: any;
    type: RzElementType;
    styles: Partial<Styles>;
    key: RzElementKey;
    children: RzElement[];
}>;

export type RenderFunction<T> = (props: T) => RzElement;

export type RzElementType = PrimitiveType | ComponentConstructor | RenderFunction<any>;

export type Styles = {
    width: number;
    height: number;
    x: number;
    y: number;
    rotation: number;
    alpha: number;
    fill: number;
    padding: number;
    strokeThickness?: number;
    strokeColor?: number;
    zIndex?: number;
};

export type Points = Array<Array<number>>;

export type MetaProps = {
    textures?: any;
    engine?: AbstractRenderEngine;
};

export const PRIMITIVE_TYPES = {
    SPRITE: 'sprite',
    TEXT: 'text',
    CIRCLE: 'circle',
    LINE: 'line',
    RECTANGLE: 'rectangle',
    IMAGE: 'image',
    SOUND: 'sound',
    COLLECTION: 'collection',
    CONTAINER: 'container',
    FRAGMENT: 'fragment'
};

export type PrimitiveType = string;