import { BaseModel } from "./Base.model";
import { Pool } from "./Pool.model";
import { Stack } from "./Stack.model";

export type Faction = BaseModel & Partial<{

    type: FactionType;
    income: number[] | Stack[];
    effect_pool: number[] | Pool[];

}>

export type FactionList = {
    [key: string]: Faction;
}

export const FACTION_TYPE = {
    PLAYER: 'PLAYER',
    BOT: 'BOT'
}

export type FactionType = keyof typeof FACTION_TYPE;

