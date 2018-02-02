import { Activity } from './Activity.model';

export interface Quest {
    id?: number;
    game?: number;
    name?: string;
    description?: string;
    image?: string;
    cost?: QuestEffect[];
    award?: QuestEffect[];
    penalty?: QuestEffect[];
    condition?: QuestCondition[];
}

export interface QuestList {
    [key: string]: Quest;
}

export interface QuestCondition {
    id?: number;
    owner?: number;
    quest?: number;
    type?: string;
    field?: number;
    resource?: number;
    activity?: number;
    amount?: number;
    byRound?: number;
    atRound?: number;
}

export interface QuestEffect {
    id?: number;
    activity?: Activity;
}





