import { Nominal } from 'simplytyped';

import { RzStyles } from "@app/render-kit";

import { WidgetId } from "./Widget.model";
import { ParamedExpressionFunc } from "./Expression.model";
import { ExpressionContext, GameId } from '../models';
import { VersionId } from './Version.model';
import { ModuleId } from './Module.model';

export type EntityId = Nominal<string, 'id'>;

export type BaseModel<T = EntityId> = {
  id: T;

  name: string;
  description: string;
  module: ModuleId;
};

export type WithBoard = {
  board: WidgetId;
}

export type WithStyle = {
  style: string; // Expression -> Style
  style_inline: RzStyles;
};

export type WithRuntimeStyle<T = any> = {
  style_inline: RzStyles;
  style: ParamedExpressionFunc<T, RzStyles>;
};

export type GameEntityParser<E, D, R> = {
  toRuntime: (context: ExpressionContext, entity: E) => R;
  toDto: (entity: E) => D;
  toEntity: (dtoEntity: D) => E;
};