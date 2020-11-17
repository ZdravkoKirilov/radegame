import {
    AbstractRenderEngine, GenericEventHandler, ComponentConstructor, RenderFunction, Component,
    ContextManager, AssetManager, PRIMS, StateHooks, EffectHooks, MemoHooks, RefHooks, RzEventTypes, StatefulComponent
} from "../internal";

export type RzElement<T extends RzElementProps = {}> = {
    type: RzElementType;
    props: RzElementProps & T,
    children: RzNode[]
};

export type RzNode = RzElement | RzElement[] | RenderFunction | RenderFunction[] | RenderFunction<any>;

export type RzElementKey = number | string;

export type RzElementPrimitiveProps = DefaultEvents & {
    styles?: Partial<RzStyles>;
} & RzElementProps;

export type RzElementProps = Partial<{
    key: RzElementKey;
    id: string | number;
    name: string;
    points: Points;
    ref: (ref: Component) => void;
    children: RzElement[] | RenderFunction[];
}>;

export type RzElementType<T extends RzElementProps = {}> = PrimitiveType | ComponentConstructor<T> | RenderFunction;

export type CompositeType<T = any> = ComponentConstructor<T> | RenderFunction;

export const isOfPrimitiveType = (type: any): type is PrimitiveType => {
    return new Set(Object.values(PRIMS)).has(type as any)
};

export const isRenderFunction = (type: any): type is RenderFunction => {
    return typeof type === typeof Function && !('stateful' in type);
};

export const isStatefulType = (type: any): type is StatefulComponent => {
    return 'stateful' in type;
};

export const isRzElementType = (type: any): type is RzElementType => {
    return isOfPrimitiveType(type) || isStatefulType(type) || isRenderFunction(type);
}

export type RzStyles = Partial<{
    width: number;
    height: number;
    x: number;
    y: number;
    z: number;

    rotation: number;  // degrees
    skew: string; // "xValue yValue"
    pivot: string;  // "xValue yValue"
    anchor: string; // "xValue yValue"
    scale: string; // "xValue yValue"

    opacity: number;
    fill: number | string | string[];
    tint: number | string;
    radius: number;
    border_radius: number;

    stroke_thickness: number;
    stroke_color: string | number;

    mask: number[];

    font_size: number;
    font_family: string;
    font_style: FontStyle;
}>;

export type RzTextStyles = Partial<Pick<RzStyles, 'stroke_color' | 'stroke_thickness' | 'fill' | 'font_family' | 'font_size' | 'font_style' | 'x' | 'y'>>

export const FONT_STYLES = {
    bold: 'bold',
    italic: 'italic',
    normal: 'normal',
} as const;

type FontStyle = keyof typeof FONT_STYLES;

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
export type RzPoint = { x: number, y: number };
export type RzSize = { width: number, height: number };

export type MetaProps = {
    engine: AbstractRenderEngine;
    context: ContextManager;
    assets: AssetManager;
    hooks: {
        state: StateHooks;
        effect: EffectHooks;
        memos: MemoHooks;
        refs: RefHooks;
    }
    root: Component;
};

export type PrimitiveType = keyof typeof PRIMS;

export type DefaultEvents = Partial<{
    [key in RzEventTypes]: GenericEventHandler;
}>;