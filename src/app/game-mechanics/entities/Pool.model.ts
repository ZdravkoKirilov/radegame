import { BaseModel } from "./Base.model";
import { Choice } from "./Choice.model";
import { GameAction } from "./Action.model";
import { Condition } from "./Condition.model";
import { Stack } from "./Stack.model";

export type Pool = BaseModel & Partial<{

    mode: PoolMode;
    pick: PoolPickMode;
    quota: PoolQuotaMode;

    min_cap: number;
    max_cap: number;

    random_cap: boolean;
    allow_same_pick: boolean;

    items: PoolItem[];
}>

export type PoolItem = Partial<{
    id: number;
    owner: number;

    action: number | GameAction;
    condition: number | Condition;
    choice: number | Choice;

    quota: number;

    restricted: number[] | Stack[];
    allowed: number[] | Stack[];
    cost: number[] | Stack[];
}>

export const POOL_MODES = {
    DRAW: 'DRAW',
    AUTO: 'AUTO'
};

export type PoolMode = keyof typeof POOL_MODES;

export const POOL_PICK = {
    RANDOM: 'RANDOM',
    CHOICE: 'CHOICE'
};

export type PoolPickMode = keyof typeof POOL_PICK;

export const POOL_QUOTA = {
    ONCE: 'ONCE',
    REPEATING: 'REPEATING'
};

export type PoolQuotaMode = keyof typeof POOL_QUOTA;

export type PoolList = { [key: string]: Pool };