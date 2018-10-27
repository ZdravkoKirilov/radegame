import { BaseModel } from "./Base.model";
import { Choice } from "./Choice.model";
import { GameAction } from "./Action.model";
import { Condition } from "./Condition.model";

export type Pool = BaseModel & Partial<{

    mode: PoolMode;
    pick: PoolPickMode;
    quota: PoolQuotaMode;

    min_cap: number;
    max_cap: number;

    random_cap: boolean;
    allow_same_pick: boolean;
}>

export type PoolItem = Partial<{
    id: number;
    owner: number;

    action: number | GameAction;
    condition: number | Condition;
    choice: number | Choice;

    quota: number;

    restriction: number[];
    cost: number[];
}>

export const PoolModes = {
    DRAW: 'DRAW',
    TRIGGER: 'TRIGGER'
};

export type PoolMode = keyof typeof PoolModes;

export const PoolPickModes = {
    RANDOM: 'RANDOM',
    CHOICE: 'CHOICE'
};

export type PoolPickMode = keyof typeof PoolPickModes;

export const PoolQuotaModes = {
    ONCE: 'ONCE',
    REPEATING: 'REPEATING'
};

export type PoolQuotaMode = keyof typeof PoolQuotaModes;

export type PoolList = { [key: string]: Pool };