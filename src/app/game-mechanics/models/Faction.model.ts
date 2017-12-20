export interface Faction {
    id?: number;
    name?: string;
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

