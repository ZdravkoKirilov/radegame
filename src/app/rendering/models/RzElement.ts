import { AbstractRenderEngine } from "../interfaces";
import { ComponentConstructor } from "./Component";
import { ContextManager, AssetManager } from "../services";

export type RzElement = {
    type: RzElementType;
    props: RzElementProps,
    children: RzElement[];
};

export type RzElementChild = RzElement | Function | RzElement[];

export type RzElementKey = number | string;

export type RzElementProps = Partial<{
    [key: string]: any;
    styles: Partial<Styles>;
    key: RzElementKey;
    children: RzElementChild;
}>;

export type RenderFunction<T> = (props?: T) => RzElement;

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
    context?: ContextManager;
    assets?: AssetManager;
};

export const PRIMS = {
    SPRITE: 'sprite',
    TEXT: 'text',
    CIRCLE: 'circle',
    LINE: 'line',
    RECTANGLE: 'rectangle',
    COLLECTION: 'collection',
    CONTAINER: 'container',
    FRAGMENT: 'fragment',
    POLYGON: 'polygon',
};

export type PrimitiveType = string;

export const isValidRzElement = (elem: any): elem is RzElement => {
    return 'type' in elem && 'props' in elem && 'children' in elem;
}