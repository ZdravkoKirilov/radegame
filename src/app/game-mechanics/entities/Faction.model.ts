import { BaseModel, WithBoard } from "./Base.model";

export type Faction = BaseModel & WithBoard & Partial<{
    type: FactionType;
}>

export const FACTION_TYPE = {
    PLAYER: 'PLAYER',
    BOT: 'BOT'
}

export type FactionType = keyof typeof FACTION_TYPE;

