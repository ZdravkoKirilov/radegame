import { Nominal } from 'simplytyped';

import { RzStyles } from "@app/render-kit";

import { ParamedExpressionFunc } from "./Expression.model";
import { ExpressionContext } from '../models';
import { ModuleId } from './Module.model';
import { ModularEntity } from './types';


export type BaseModel<T = ModularEntity['id']> = {
  id: T;

  name: string;
  description: string;
  module: ModuleId;
};

export type WithStyle = {
  style: string; // Expression -> Style
  style_inline: RzStyles;
};

export type WithRuntimeStyle<T = any> = {
  style_inline: RzStyles;
  style: ParamedExpressionFunc<T, RzStyles>;
};

export type GameEntityParser<E, D, R> = {
  toRuntime: (context: ExpressionContext, entity: E, ...args: unknown[]) => R;
  toDto: (entity: E) => D;
  toEntity: (dtoEntity: D) => E;
};