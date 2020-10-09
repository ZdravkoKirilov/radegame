import { Nominal, Omit } from 'simplytyped';
import { omit } from 'lodash/fp';

import { RzStyles } from "@app/render-kit";
import { Tagged } from '@app/shared';

import { BaseModel, GameEntityParser } from "./Base.model";
import { toModuleId } from './Module.model';

export type StyleId = Nominal<string, 'StyleId'>;
export const toStyleId = (source: unknown) => String(source) as StyleId;

export type Style = BaseModel<StyleId> & RzStyles & Tagged<'Style'>;

export type DtoStyle = Omit<Style, 'id' | 'module' | '__tag'> & {
  id: number;
  module: number;
};

export const Style: GameEntityParser<Style, DtoStyle, Style> = {

  toEntity(dto) {
    return {
      ...dto,
      __tag: 'Style',
      id: toStyleId(dto.id),
      module: toModuleId(dto.module),
    };
  },

  toDto(entity) {
    return {
      ...omit('__tag', entity),
      id: Number(entity.id),
      module: Number(entity.module),
    };
  },

  toRuntime(_, entity) {
    return entity;
  }
};