import { AbstractRenderEngine } from "../interfaces";
import { ComponentConstructor } from "./Component";
import { ContextManager, AssetManager } from "../services";

export type RzElement<T = any> = {
    type: RzElementType;
    props: RzElementProps & T,
    children: RzElement[];
};

export type RzElementChild = RzElement | Function | RzElement[];

export type RzElementKey = number | string;

export type RzElementProps = DefaultEvents & Partial<{
    styles: Partial<Styles>;
    key: RzElementKey;
    id: string | number;
    interactive: boolean;
    hitArea: any;
    textStyle: { [key: string]: any };
    points: Points;
    children: RzElementChild;
    // [key: string]: any;
}>;

export type RenderFunction<T = any> = (props?: T) => RzElement;

export type RzElementType = PrimitiveType | ComponentConstructor | RenderFunction;

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
};

export type Points = Array<Array<number>>;

export type MetaProps = {
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

type EventHandler = (...args: any) => any;

export type DefaultEvents = Partial<{
    onClick: EventHandler,
    onRightClick: EventHandler;
    onClickOutside: EventHandler;
}>;