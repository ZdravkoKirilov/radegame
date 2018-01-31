export interface Quest {
    id?: number;
    game?: number;
    name?: string;
    description?: string;
    image?: string;
    cost?: QuestCost[];
    award?: QuestAward[];
    penalty?: QuestPenalty[];
    condition?: QuestCondition[];
}

export interface QuestList {
    [key: string]: Quest;
}

export interface QuestAward {
    id?: number;
    owner?: number;
    quest?: number;
    type?: string;
    field?: number;
    resource?: number;
    action?: number;
    maxAmount?: number;
    minAmount?: number;
}

export interface QuestPenalty {
    id?: number;
    owner?: number;
    quest?: number;
    type?: string;
    field?: number;
    resource?: number;
    action?: number;
    maxAmount?: number;
    minAmount?: number;
}

export interface QuestCondition {
    id?: number;
    owner?: number;
    quest?: number;
    type?: string;
    field?: number;
    resource?: number;
    action?: number;
    amount?: number;
    byRound?: number;
    atRound?: number;
}

export interface QuestCost {
    id?: number;
    owner?: number;
    quest?: number;
    type?: string;
    field?: number;
    resource?: number;
    action?: number;
    amount?: number;
}

export type QuestSubType = QuestCondition | QuestCost | QuestAward | QuestPenalty;

