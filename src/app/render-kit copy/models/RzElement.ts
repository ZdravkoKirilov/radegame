import { get, isArray, isFunction, isObject } from "lodash";

import {
  AbstractRenderEngine, GenericEventHandler, Component,
  ContextManager, AssetManager, PRIMS, RzEventTypes, CustomComponent
} from "../internal";

export type RzElement<T extends Partial<RzElementProps> = {}> = {
  type: RzElementType;
  props: Readonly<T>,
};

export type ComponentRenderResult = null | RzElement | Array<RzElement | null>;
export type CustomComponentChildrenProp = RzElement | Array<RzElement | null>;

export type RzElementPrimitiveProps = DefaultEvents & RzElementProps & {
  children: Array<RzElement | null>;
  styles?: Partial<RzStyles>;
};

export type RzElementProps = {
  id: string | number;
  name: string;
  points: Points;
  children: CustomComponentChildrenProp;
};

export type RzElementType = PrimitiveType | typeof CustomComponent;

export const isOfPrimitiveType = (type: any): type is PrimitiveType => {
  return new Set(Object.values(PRIMS)).has(type as any)
};

export const isCustomType = (type: any): type is CustomComponent => {
  return isFunction(type);
};

export const isRzElementType = (type: any): type is RzElementType => {
  return isOfPrimitiveType(type) || isCustomType(type);
};

export const isRzElement = (source: unknown): source is RzElement => {
  const type = get(source, 'type');
  const props = get(source, 'props');
  const children = get(source, 'children');

  const propsAreValid = isObject(props);
  const childrenAreValid = isArray(children);

  return isRzElementType(type) && propsAreValid && childrenAreValid;
};

export type RzStyles = {
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
};

export type RzTextStyles = Partial<Pick<RzStyles, 'stroke_color' | 'stroke_thickness' | 'fill' | 'font_family' | 'font_size' | 'font_style' | 'x' | 'y'>>

export const FONT_STYLES = {
  bold: 'bold',
  italic: 'italic',
  normal: 'normal',
} as const;

type FontStyle = keyof typeof FONT_STYLES;

export type Points = Array<[number, number]>;
export type RzPoint = { x: number, y: number };
export type RzSize = { width: number, height: number };

export type MetaProps = {
  engine: AbstractRenderEngine;
  context: ContextManager;
  assets: AssetManager;
  root: Component;
};

export type PrimitiveType = keyof typeof PRIMS;

export type DefaultEvents = Partial<{
  [key in RzEventTypes]: GenericEventHandler;
}>;