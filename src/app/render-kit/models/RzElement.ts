import { AbstractRenderEngine } from "../interfaces";
import { ComponentConstructor, RenderFunction } from "./Component";
import { ContextManager, AssetManager } from "../services";
import { AnimationBase } from "../animations";
import { PRIMS } from "../primitives";

export type RzElement<T extends RzElementProps = {}> = {
    type: RzElementType;
    props: RzElementProps & T,
    children: RzElement[];
};

export type RzElementChild = RzElement | RzElement[];

export type RzElementKey = number | string;

export type RzElementProps = DefaultEvents & Partial<{
    styles: Partial<RzStyles>;
    key: RzElementKey;
    id: string | number;
    name: string;
    button: boolean;
    hitArea: any;
    textStyle: { [key: string]: any };
    points: Points;
    children: RzElement[];
    animations: AnimationBase[];
    draggable: DraggableConfig;
    scrollable: ScrollableConfig;
}>;

export type DraggableConfig = Partial<{
    xAxis: boolean;
    yAxis: boolean;
    maxX: number;
    minX: number;
    maxY: number;
    minY: number;
}>;

export type ScrollableConfig = Partial<{
    xThreshold: number;
    yThreshold: number;
    maxX: string;
    minX: string;
    maxY: string;
    minY: string;
}>;

export type RzElementType<T extends RzElementProps = {}> = PrimitiveType | ComponentConstructor<T> | RenderFunction;

export type RzStyles = {
    width: number;
    height: number;
    x: number;
    y: number;
    rotation: number;  // radians
    skew: string; // "xValue yValue"
    angle: number; // degrees
    pivot: number;  // exact pixels
    anchor: number; // 0 - 1
    alpha: number;
    fill: number;
    radius: number;
    borderRadius: number;
    strokeThickness: number;
    strokeColor: number;
    scale: number;
    color: number;
    blur: number;
    distance: number;
    mask: number[];
};

export type Points = Array<Array<number>>;

export type MetaProps = {
    engine?: AbstractRenderEngine;
    context?: ContextManager;
    assets?: AssetManager;
};

export type PrimitiveType = keyof typeof PRIMS;

type EventHandler = (...args: any) => any;

export type DefaultEvents = Partial<{
    onClick: EventHandler,
    onPointerDown: EventHandler,
    onPointerUp: EventHandler,
    onClickOutside: EventHandler,
    onPointerOver: EventHandler;
    onPointerOut: EventHandler;
    onDragEnd: EventHandler;
    onDragMove: EventHandler;
    onScroll: EventHandler;
    onScrollEnd: EventHandler;
    onWheel: EventHandler;
    onKeypress: (event: KeyboardEvent) => void;
    onFocus: EventHandler;
    onBlur: EventHandler;
}>;