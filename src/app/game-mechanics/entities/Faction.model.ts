import { BaseModel } from "./Base.model";
import { Round } from "./Round.model";
import { Pool } from "./Pool.model";

export type Faction = BaseModel & Partial<{

    type: FactionType;

    action_limit: number;
    resource_limit: number;

    action_play_limit: number;

    effect_pool: number[] | Pool[];

}>

export type FactionList = {
    [key: string]: Faction;
}

export const FACTION_TYPE = {
    PLAYER: 'PLAYER',
    MASTER: 'MASTER',
    BOT: 'BOT'
}

export type FactionType = keyof typeof FACTION_TYPE;

