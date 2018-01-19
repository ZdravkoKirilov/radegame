export interface Quest {
    id?: number;
    game?: number;
    name?: string;
    description?: string;
    image?: string;
    cost?: QuestCost[];
    awards?: QuestAward[];
    penalties?: QuestPenalty[];
    conditions?: QuestCondition[];
}

export interface QuestList {
    [key: string]: Quest;
}

export interface QuestAward {
    id?: number;
}

export interface QuestCondition {
    id?: number;
}

export interface QuestPenalty {
    id?: number;
}

export interface QuestCost {
    id?: number;
    resource?: number;
    quest?: number;
    amount?: number;
}

