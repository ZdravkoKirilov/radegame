import { Omit, Nominal } from 'simplytyped';
import { omit } from 'lodash/fp';

import { Tagged } from '@app/shared';

import { BaseModel, GameEntityParser } from "./Base.model";
import { toModuleId } from './Module.model';

export type ImageAssetId = Nominal<string, 'ImageAssetId'>;

export const toImageId = (source: unknown) => String(source) as ImageAssetId;

export type ImageAsset = Tagged<'ImageAsset', BaseModel<ImageAssetId> & {
  image: string;
  thumbnail: string;
  svg: string;
  keywords: string;
}>;

export type DtoImageAsset = Omit<ImageAsset, '__tag' | 'id' | 'module'> & {
  id: number;
  module: number;
};

export const ImageAsset: GameEntityParser<ImageAsset, DtoImageAsset, ImageAsset> = {

  toEntity(dto) {
    return {
      ...dto,
      __tag: 'ImageAsset',
      id: toImageId(dto.id),
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
