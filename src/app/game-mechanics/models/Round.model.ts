export interface Round {
    id?: number;
    game?: number;
    name?: string;
    description?: string;
    image?: string;
    order?: number;
    replay?: number;
    condition?: RoundCondition[];
    quests?: RoundQuest[];
    activities?: RoundActivity[];
}

export interface RoundCondition {
    id?: number;
    quest?: number;
}

export interface RoundQuest {
    id?: number;
    quest?: number;
}

export interface RoundActivity {
    id?: number;
    action?: number;
}

export interface RoundList {
    [key: string]: Round;
}
