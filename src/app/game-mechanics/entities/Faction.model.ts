import { BaseModel } from "./Base.model";
import { Pool } from "./Pool.model";
import { Stack } from "./Stack.model";
import { Stage } from "./Stage.model";

export type Faction = BaseModel & Partial<{

    type: FactionType;
    income: number[] | Stack[];
    effect_pool: number[] | Pool[];
    stage: number | Stage;
}>

export type FactionList = {
    [key: string]: Faction;
}

export const FACTION_TYPE = {
    PLAYER: 'PLAYER',
    BOT: 'BOT'
}

export type FactionType = keyof typeof FACTION_TYPE;

