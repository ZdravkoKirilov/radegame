import { Nominal, Omit } from 'simplytyped';
import { omit } from 'lodash/fp';

import { Tagged } from '@app/shared';

import { GameLanguageId } from "../models";
import { ExpressionFunc } from "./Expression.model";
import { enrichEntity, parseAndBind } from "../helpers";
import { ModuleId } from './Module.model';
import { toVersionId, VersionId } from './Version.model';
import { ImageAssetId, toImageId } from './ImageAsset.model';
import { GameEntityParser } from './Base.model';

export type SetupId = Nominal<string, 'SetupId'>;
export const toSetupId = (source: unknown) => String(source) as SetupId;

export type Setup = Tagged<'Setup', {
  id: SetupId;
  version: VersionId;

  image: ImageAssetId;
  name: string;
  description: string;

  min_players: number;
  max_players: number;
  recommended_age: number;

  get_active_module: string;
  get_active_language: string;
}>;

type DtoSetup = Omit<Setup, '__tag' | 'id' | 'version' | 'image'> & {
  id: number;
  version: number;
  image: number;
};

export type RuntimeSetup = Omit<Setup, 'get_active_language' | 'get_active_module'> & {
  get_active_module: ExpressionFunc<ModuleId>;
  get_active_language: ExpressionFunc<GameLanguageId>;
};

export const Setup: GameEntityParser<Setup, DtoSetup, RuntimeSetup> = {

  toRuntime(context, setup) {
    if (setup) {
      return enrichEntity<Setup, RuntimeSetup>(context.conf, {
        get_active_language: src => parseAndBind(context)(src),
        get_active_module: src => parseAndBind(context)(src),
      }, setup);
    }
    return null;
  },

  toDto(entity) {
    return {
      ...omit('__tag', entity),
      id: Number(entity.id),
      version: Number(entity.version),
      image: Number(entity.image),
    }
  },

  toEntity(dto) {
    return {
      ...dto,
      __tag: 'Setup',
      id: toSetupId(dto.id),
      version: toVersionId(dto.version),
      image: toImageId(dto.image),
    };
  }
};

