import { BaseModel } from "./Base.model";

export type EffectGroup = BaseModel & Partial<{

    mode: EffectMode;
    pick: EffectPickMode;
    quota: EffectQuotaMode;

    min_cap: number;
    max_cap: number;

    random_cap: boolean;
    allow_same_pick: boolean;
}>

export type EffectGroupItem = Partial<{
    id: number;
    owner: number;

    action: number;
    condition: number;

    quota: number;

    restriction: number[];
    cost: number[];
}>

export const EffectModes = {
    DRAW: 'DRAW',
    TRIGGER: 'TRIGGER'
};

export type EffectMode = keyof typeof EffectModes;

export const EffectPickModes = {
    RANDOM: 'RANDOM',
    CHOICE: 'CHOICE'
};

export type EffectPickMode = keyof typeof EffectPickModes;

export const EffectQuotaModes = {
    ONCE: 'ONCE',
    REPEATING: 'REPEATING'
};

export type EffectQuotaMode = keyof typeof EffectQuotaModes;

export type GroupList = { [key: string]: EffectGroup };