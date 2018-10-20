export interface Faction {
    id?: number;
    game?: number;
    name?: string;
    type?: FactionType;
    image?: string;
    description?: string;
    start?: number; // field
    keywords?: string;
    activity_limit?: number;
    resource_limit?: number;
    resources?: FactionResource[];
    income?: FactionResource[];
}

export interface FactionList {
    [key: string]: Faction;
}

export interface FactionResource {
    id?: number;
    resource?: number;
    quantity?: number;
}

export const FACTION_TYPE = {
    PLAYER: 'PLAYER',
    MASTER: 'MASTER',
    BOT: 'BOT'
}

export type FactionType = typeof FACTION_TYPE.PLAYER |
    typeof FACTION_TYPE.MASTER | typeof FACTION_TYPE.BOT;

