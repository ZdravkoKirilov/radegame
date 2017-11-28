export interface Faction {
    id?: number|string;
    name?: string;
    image?: string;
    abilities?: string[];
    description?: string;
}

export interface FactionList {
    [key: string]: Faction;
}

