export interface Faction {
    id?: number;
    name?: string;
    type?: FactionType;
    image?: string;
    description?: string;
    game?: number;
    resources?: FactionResource[];
    income?: FactionResource[];
}

export interface FactionList {
    [key: string]: Faction;
}

export interface FactionResource {
    id?: number;
    resource?: number;
    field?: number;
    quantity?: number;
}

export const FACTION_TYPES = {
    PLAYER: 'PLAYER',
    MASTER: 'MASTER',
    BOT: 'BOT'
}

export type FactionType = typeof FACTION_TYPES.PLAYER | typeof FACTION_TYPES.MASTER | typeof FACTION_TYPES.BOT;

