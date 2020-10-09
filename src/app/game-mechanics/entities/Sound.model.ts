import { Nominal, Omit } from 'simplytyped';
import { omit } from 'lodash/fp';

import { Tagged } from '@app/shared';

import { BaseModel, GameEntityParser } from "./Base.model";
import { toModuleId } from './Module.model';

export type SoundId = Nominal<string, 'SoundId'>;
export const toSoundId = (source: unknown) => String(source) as SoundId;

export type Sound = BaseModel<SoundId> & Tagged<'Sound', {
  file: string; // TODO: "File" type
}>;

export type DtoSound = Omit<Sound, '__tag' | 'id' | 'module'> & {
  id: number;
  module: number;
};

export const Sound: GameEntityParser<Sound, DtoSound, Sound> = {

  toEntity(dto) {
    return {
      ...dto,
      __tag: 'Sound',
      id: toSoundId(dto.id),
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