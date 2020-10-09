import { Nominal, Omit } from 'simplytyped';
import { omit } from 'lodash/fp';

import { Tagged } from "@app/shared";

import { Sound, SoundId, toSoundId } from "./Sound.model";
import { BaseModel, GameEntityParser } from "./Base.model";
import { enrichEntity } from "../helpers";
import { toModuleId } from './Module.model';

export type SonataId = Nominal<string, 'SonataId'>;
export const toSonataId = (source: unknown) => String(source) as SonataId;

export type Sonata = BaseModel<SonataId> & Tagged<'Sonata', {
  type: SonataPlayType;
  steps: SonataStep[];

  loop: boolean;
}>;

export type DtoSonata = Omit<Sonata, '__tag' | 'id' | 'module' | 'steps' | 'type'> & {
  id: number;
  module: number;
  type: string;
  steps: DtoSonataStep[];
};

export type RuntimeSonata = Omit<Sonata, 'steps'> & {
  steps: RuntimeSonataStep[];
};

export const Sonata: GameEntityParser<Sonata, DtoSonata, RuntimeSonata> = {

  toRuntime(context, sonata) {
    return {
      ...sonata,
      steps: sonata.steps.map(elem => SonataStep.toRuntime(context, elem))
    };
  },

  toEntity(dto) {
    return {
      ...dto,
      __tag: 'Sonata',
      id: toSonataId(dto.id),
      module: toModuleId(dto.module),
      type: dto.type as SonataPlayType,
      steps: dto.steps.map(elem => SonataStep.toEntity(elem))
    };
  },

  toDto(entity) {

    return {
      ...omit('__tag', entity),
      id: Number(entity.id),
      module: Number(entity.module),
      steps: entity.steps.map(elem => SonataStep.toDto(elem))
    };
  },

}

type SonataStepId = Nominal<string, 'SonataStepId'>;
const toSonataStepId = (source: unknown) => String(source) as SonataStepId;

export type SonataStep = Tagged<'SonataStep', {
  id: SonataStepId;
  owner: SonataId;

  name: string;

  sound: SoundId;

  volume: number;
  loop: boolean;
  rate: number;

  fade_from: number;
  fade_to: number;
  fade_duration: number;
}>

type DtoSonataStep = Omit<SonataStep, '__tag' | 'id' | 'owner' | 'sound'> & {
  id: number;
  owner: number;
  sound: number;
}

type RuntimeSonataStep = Omit<SonataStep, 'sound'> & {
  sound: Sound;
}

const SonataStep: GameEntityParser<SonataStep, DtoSonataStep, RuntimeSonataStep> = {

  toEntity(dto) {
    return {
      ...dto,
      __tag: 'SonataStep',
      id: toSonataStepId(dto.id),
      owner: toSonataId(dto.owner),
      sound: toSoundId(dto.sound),
    }
  },

  toDto(entity) {
    return {
      ...omit('__tag', entity),
      id: Number(entity.id),
      owner: Number(entity.owner),
      sound: Number(entity.sound),
    };
  },

  toRuntime(ctx, entity) {
    return enrichEntity<SonataStep, RuntimeSonataStep>(ctx, {
      sound: 'sounds'
    }, entity);
  }
}

export const SONATA_PLAY_TYPE = {
  SEQUENCE: 'SEQUENCE',
  PARALLEL: 'PARALLEL',
} as const;

export type SonataPlayType = keyof typeof SONATA_PLAY_TYPE;