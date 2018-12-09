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
    button: boolean;
    hitArea: any;
    textStyle: { [key: string]: any };
    points: Points;
    children: RzElementChild;
    // [key: string]: any;
}>;

export type RenderFunction<T = any> = (props?: T) => RzElement;

export type RzElementType<T = any> = PrimitiveType | ComponentConstructor<T> | RenderFunction;

export type Styles = {
    width: number;
    height: number;
    x: number;
    y: number;
    rotation: number;
    alpha: number;
    fill: number;
    padding: number;
    radius: number;
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
    sprite: 'sprite',
    text: 'text',
    circle: 'circle',
    line: 'line',
    rectangle: 'rectangle',
    collection: 'collection',
    container: 'container',
    fragment: 'fragment',
    polygon: 'polygon',
};

export type PrimitiveType = keyof typeof PRIMS;

export const isValidRzElement = (elem: any): elem is RzElement => {
    return 'type' in elem && 'props' in elem && 'children' in elem;
}

type EventHandler = (...args: any) => any;

export type DefaultEvents = Partial<{
    onClick: EventHandler,
    onPointerDown: EventHandler,
    onClickOutside: EventHandler;
}>;