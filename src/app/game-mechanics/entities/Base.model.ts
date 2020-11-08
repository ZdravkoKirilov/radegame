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

export type GameEntityParser<Entity, DtoEntity, RuntimeEntity> = {
  toRuntime: (context: ExpressionContext, entity: Entity, ...args: unknown[]) => RuntimeEntity;
  toDto: (entity: Entity) => DtoEntity;
  toEntity: (dtoEntity: DtoEntity) => Entity;

  fromUnknown: {
    toEntity: (input: unknown) => Entity;
  }
};