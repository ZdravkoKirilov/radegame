import { BaseModel, WithBoard } from './Base.model';
import { Dictionary, Omit, WithKeysAs } from '@app/shared';
import { API_URLS } from '@app/core';
import { ALL_ENTITIES } from './types';
import { GameTemplate } from '../models';

export type Round = BaseModel & WithBoard & Partial<{
    phases: number[]; // Phase[]
    loaders: RoundDataLoader[];

    load_by_keyword: string; // loads all types of resources with the given keyword(s)
}>

export type PhaseSlot = Partial<{
    owner: number;
    phase: number;
}>;

export type RoundDataLoader = {
    owner: number;

    source: RoundDataSource;
    slice: RoundDataSlice;
    params: Dictionary;
};

export type RoundDataSlice = keyof Omit<typeof ALL_ENTITIES, 'games'>;
export type RoundDataSource = keyof typeof ROUND_DATA_SOURCES;

export const ROUND_DATA_SOURCES: WithKeysAs<GameTemplate> = {
    images: API_URLS.IMAGES,
    choices: API_URLS.CHOICES,
    sounds: API_URLS.SOUNDS,
    actions: API_URLS.ACTIONS,
    conditions: API_URLS.CONDITIONS,
    stages: API_URLS.STAGES,
    rounds: API_URLS.ROUNDS,
    slots: API_URLS.SLOTS,
    shapes: API_URLS.SHAPES,
    factions: API_URLS.FACTIONS,
    expressions: API_URLS.EXPRESSIONS,
    sonatas: API_URLS.SONATAS,
    texts: API_URLS.TEXTS,
    tokens: API_URLS.TOKENS,
    transitions: API_URLS.TRANSITIONS,
    animations: API_URLS.ANIMATIONS,
    styles: API_URLS.STYLES,
    setups: API_URLS.SETUPS,
    phases: API_URLS.PHASES,
} as const;