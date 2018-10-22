import { BaseModel } from "./Base.model";
import { Omit } from "@app/shared";
import { Round } from "./Round.model";

export type Faction = BaseModel & Partial<{

    type: FactionType;

    action_limit: number;
    resource_limit: number;

}>

export type Token = Omit<BaseModel, 'game'> & Partial<{
    
    action_limit: number;
    resource_limit: number;

    start: number | Round;
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

