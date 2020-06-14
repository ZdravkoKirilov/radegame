import { Omit, safeJSON } from "@app/shared";

import { ParamedExpressionFunc } from "./Expression.model";
import { Style } from "./Style.model";
import { ExpressionContext } from "../models";
import { enrichEntity, parseAndBind } from "../helpers";
import { WithStyle, BaseModel } from "./Base.model";

export type Shape = WithStyle & BaseModel & Partial<{
  type: ShapeType;
  points: ShapePoint[];
}>;

export const Shape = {
  toRuntime(context: ExpressionContext, shape: Shape) {
    return enrichEntity<Shape, RuntimeShape>(context.conf, {
      style: src => parseAndBind(context)(src),
      style_inline: src => safeJSON(src, {}),
    }, shape);
  }
}

export type ShapePoint = {
  id: number;
  owner: number;

  x: string;
  y: string;
};

export const SHAPE_TYPES = {
  rectange: 'rectangle',
  circle: 'circle',
  polygon: 'polygon',
  ellipse: 'ellipse',
  line: 'line',
} as const;

export type ShapeType = keyof typeof SHAPE_TYPES;

export type RuntimeShape = Omit<Shape, 'style' | 'style_inline'> & {
  style: ParamedExpressionFunc<RuntimeShape, Style>;
  style_inline: Style;
};