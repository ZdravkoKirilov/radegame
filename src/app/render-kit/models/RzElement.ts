import { AbstractRenderEngine } from "../interfaces";
import { ComponentConstructor, RenderFunction, Component } from "./Component";
import { ContextManager, AssetManager } from "../services";
import { PRIMS } from "../primitives";
import { StateHooks, EffectHooks, MemoHooks, RefHooks } from "../helpers";
import { FontStyle } from "@app/game-mechanics";

export type RzElement<T extends RzElementProps = {}> = {
    type: RzElementType;
    props: RzElementProps & T,
    children: RzElement[] | RenderFunction[];
};

export type RzElementChild = RzElement | RzElement[];

export type RzElementKey = number | string;

export type RzElementProps = DefaultEvents & Partial<{
    styles: Partial<RzStyles>;
    key: RzElementKey;
    id: string | number;
    name: string;
    hitArea: any;
    textStyle: { [key: string]: any };
    points: Points;
    children: RzElement[] | RenderFunction[];
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

export type CompositeType<T = any> = ComponentConstructor<T> | RenderFunction;

export type RzStyles = Partial<{
    width: number;
    height: number;
    x: number;
    y: number;
    rotation: number;  // degrees

    skew: string; // "xValue yValue"
    angle: number; // degrees
    pivot: string;  // "xValue yValue"
    anchor: string; // "xValue yValue"
    alpha: number;
    fill: number | string | string[];
    radius: number;
    border_radius: number;
    stroke_thickness: number;
    stroke_color: string | number;
    scale: string; // "xValue yValue"
    color: number;
    blur: number;
    distance: number;
    mask: number[];

    interactive: boolean;
    z_order: number;
}>;

export type RzTextStyles = Partial<Pick<RzStyles, 'stroke_color' | 'stroke_thickness' | 'fill'>> & Partial<{
    font_size: number;
    font_family: string;
    font_style: FontStyle;
}>;

/*
 align?: string;
        breakWords?: boolean;
        dropShadow?: boolean;
        dropShadowAlpha?: number;
        dropShadowAngle?: number;
        dropShadowBlur?: number;
        dropShadowColor?: string | number;
        dropShadowDistance?: number;
        fill?:
            | string
            | string[]
            | number
            | number[]
            | CanvasGradient
            | CanvasPattern;
        fillGradientType?: number;
        fillGradientStops?: number[];
        fontFamily?: string | string[];
        fontSize?: number | string;
        fontStyle?: string;
        fontVariant?: string;
        fontWeight?: string;
        letterSpacing?: number;
        lineHeight?: number;
        lineJoin?: string;
        miterLimit?: number;
        padding?: number;
        stroke?: string | number;
        strokeThickness?: number;
        textBaseline?: string;
        trim?: boolean;
        whiteSpace?: string;
        wordWrap?: boolean;
        wordWrapWidth?: number;
        leading?: number;
*/

export type Points = Array<[number, number]>;

export type MetaProps = {
    engine?: AbstractRenderEngine;
    context?: ContextManager;
    assets?: AssetManager;
    hooks?: {
        state: StateHooks;
        effect: EffectHooks;
        memos: MemoHooks;
        refs: RefHooks;
    }
    root?: Component;
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