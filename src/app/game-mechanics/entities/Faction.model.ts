import { BaseModel, WithBoard, WithSettings } from "./Base.model";

export type Faction = BaseModel & WithBoard & WithSettings & Partial<{
    type: FactionType;
}>

export const FACTION_TYPE = {
    PLAYER: 'PLAYER',
    BOT: 'BOT'
}

export type FactionType = keyof typeof FACTION_TYPE;

