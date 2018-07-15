import { Activity } from '.';

export interface Quest {
    id?: number;
    game?: number;
    name?: string;
    description?: string;
    keywords?: string;
    image?: string;
    stage?: number;
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
    type?: QuestConditionType;
    field?: number;
    resource?: number;
    activity?: number;
    quest?: number;
    keyword?: string;
    amount?: number;
    by_round?: number;
    at_round?: number;
}

export interface QuestEffect {
    id?: number;
    activity?: Activity;
}

export const QUEST_CONDITION = {
    GATHER: 'GATHER',
    CLAIM: 'CLAIM', // field, keyword
    REACH: 'REACH', // field, keyword
    MEET: 'MEET', // faction, keyword
    AVOID: 'AVOID', // faction, activity, keyword
    COMPLETE: 'COMPLETE', // quest, keyword
    TRIGGER: 'TRIGGER' // quest, activity, keyword
};

export type QuestConditionType =
    typeof QUEST_CONDITION.CLAIM |
    typeof QUEST_CONDITION.REACH |
    typeof QUEST_CONDITION.MEET |
    typeof QUEST_CONDITION.AVOID |
    typeof QUEST_CONDITION.COMPLETE |
    typeof QUEST_CONDITION.TRIGGER |
    typeof QUEST_CONDITION.GATHER;





