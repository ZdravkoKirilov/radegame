export interface Round {
    id?: number;
    game?: number;
    name?: string;
    description?: string;
    image?: string;
    order?: number;
    replay?: number;
    condition?: number[];
    quests?: number[];
    activities?: number[];
}

export interface RoundList {
    [key: string]: Round;
}
