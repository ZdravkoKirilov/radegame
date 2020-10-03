import { Nominal } from 'simplytyped';

import { Omit } from "@app/shared";

import { Sound, SoundId } from "./Sound.model";
import { BaseModel } from "./Base.model";
import { enrichEntity } from "../helpers";
import { GameTemplate } from "../models";

export type SonataId = Nominal<string, 'SonataId'>;

export type Sonata = BaseModel<SonataId> & Partial<{
  type: SonataPlayType;
  steps: SonataStep[];

  loop: boolean;
}>;

export const Sonata = {
  toRuntime(config: GameTemplate, sonata: Sonata) {
    return enrichEntity<Sonata, RuntimeSonata>(config, {
      steps: step => enrichEntity<SonataStep, RuntimeSonataStep>(config, {
        sound: 'sounds'
      }, step),
    }, sonata);
  }
}

export type SonataStep = Partial<{
  id: number;
  owner: number;

  name: string;

  sound: SoundId;

  volume: number;
  loop: boolean;
  rate: number;

  fade_from: number;
  fade_to: number;
  fade_duration: number;
}>

export type RuntimeSonata = Omit<Sonata, 'steps'> & {
  steps: RuntimeSonataStep[];
};

export type RuntimeSonataStep = Omit<SonataStep, 'sound'> & {
  sound: Sound;
}

export const SONATA_PLAY_TYPE = {
  SEQUENCE: 'SEQUENCE',
  PARALLEL: 'PARALLEL',
} as const;

export type SonataPlayType = keyof typeof SONATA_PLAY_TYPE;