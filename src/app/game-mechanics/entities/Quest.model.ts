import { Activity } from './index';

export interface Quest {
    id?: number;
    game?: number;
    name?: string;
    mode?: QuestMode;
    description?: string;
    keywords?: string;
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
    type?: QuestConditionType;
    field?: number;
    resource?: number;
    activity?: number;
    quest?: number;
    keywords?: string;
    amount?: number;
    byRound?: number;
    atRound?: number;
}

export interface QuestEffect {
    id?: number;
    activity?: Activity;
}

export const QUEST_CONDITION = {
    CLAIM: 'CLAIM', // field, keyword
    REACH: 'REACH', // field, ketword
    MEET: 'MEET', // faction, keyword
    AVOID: 'AVOID', // faction, activity, keyword
    COMPLETE: 'COMPLETE', // quest, keyword
    TRIGGER: 'TRIGGER' // quest, activity, keyword
};

export const QUEST_MODE = {
    TRIGGER: 'TRIGGER',
    PASSIVE: 'PASSIVE'
};

export type QuestMode = typeof QUEST_MODE.TRIGGER | typeof QUEST_MODE.PASSIVE;

export type QuestConditionType =
    typeof QUEST_CONDITION.CLAIM |
    typeof QUEST_CONDITION.REACH |
    typeof QUEST_CONDITION.MEET |
    typeof QUEST_CONDITION.AVOID |
    typeof QUEST_CONDITION.COMPLETE |
    typeof QUEST_CONDITION.TRIGGER;





