import { Nominal, Omit } from "simplytyped";
import { omit } from "lodash/fp";

import { safeJSON, Tagged } from "@app/shared";

import { ParamedExpressionFunc } from "./Expression.model";
import { Style } from "./Style.model";
import { enrichEntity, parseAndBind } from "../helpers";
import { WithStyle, BaseModel, GameEntityParser } from "./Base.model";
import { toModuleId } from "./Module.model";

export type ShapeId = Nominal<string, 'ShapeId'>;
export const toShapeId = (source: unknown) => String(source) as ShapeId;

export type Shape = Tagged<'Shape', WithStyle & BaseModel<ShapeId> & {
  type: ShapeType;
  points: ShapePoint[];
}>;

export type DtoShape = Omit<Shape, '__tag' | 'id' | 'module' | 'type' | 'points'> & {
  id: number;
  module: number;
  type: string;
  points: DtoShapePoint[];
}

export type RuntimeShape = Omit<Shape, 'style' | 'style_inline'> & {
  style: ParamedExpressionFunc<RuntimeShape, Style>;
  style_inline: Style;
};

export const Shape: GameEntityParser<Shape, DtoShape, RuntimeShape> = {

  toRuntime(context, shape) {
    return enrichEntity<Shape, RuntimeShape>(context.conf, {
      style: src => parseAndBind(context)(src),
      style_inline: src => safeJSON(src, {}),
    }, shape);
  },

  toEntity(dto) {
    return {
      ...dto,
      __tag: 'Shape',
      id: toShapeId(dto.id),
      module: toModuleId(dto.module),
      type: dto.type as ShapeType,
      points: dto.points.map(elem => ShapePoint.toEntity(elem))
    };
  },

  toDto(entity) {
    return {
      ...omit('__tag', entity),
      id: Number(entity.id),
      module: Number(entity.module),
      points: entity.points.map(elem => ShapePoint.toDto(elem))
    };
  }
}

type ShapePointId = Nominal<string, 'ShapePointId'>;
const toShapePointId = (source: unknown) => String(source) as ShapePointId;

type ShapePoint = Tagged<'ShapePoint', {
  id: ShapePointId;
  owner: ShapeId;

  x: string;
  y: string;
}>;

type DtoShapePoint = Omit<ShapePoint, '__tag' | 'id' | 'owner'> & {
  id: number;
  owner: number;
};

const ShapePoint: GameEntityParser<ShapePoint, DtoShapePoint, ShapePoint> = {

  toRuntime(_, entity) {
    return entity;
  },

  toEntity(dto) {
    return {
      ...dto,
      __tag: 'ShapePoint',
      id: toShapePointId(dto.id),
      owner: toShapeId(dto.owner),
    }
  },

  toDto(entity) {
    return {
      ...omit('__tag', entity),
      id: Number(entity.id),
      owner: Number(entity.owner),
    };
  }
};

export const SHAPE_TYPES = {
  rectange: 'rectangle',
  circle: 'circle',
  polygon: 'polygon',
  ellipse: 'ellipse',
  line: 'line',
} as const;

export type ShapeType = keyof typeof SHAPE_TYPES;