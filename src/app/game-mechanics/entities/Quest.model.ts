import { Activity } from './index';

export interface Quest {
    id?: number;
    game?: number;
    name?: string;
    mode?: QuestMode;
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
    type?: QuestConditionType;
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

export const QUEST_CONDITION = {
    CLAIM_FIELD: 'CLAIM_FIELD',
    CLAIM_ANY_FIELDS: 'CLAIM_ANY_FIELDS',

    DEFEND_ANY_FIELDS: 'DEFEND_FIELDS',
    DEFEND_FIELD: 'DEFEND_FIELD',

    CLAIM_RESOURCE: 'CLAIM_RESOURCE',
    CLAIM_ANY_RESOURCE: 'CLAIM_ANY_RESOURCE',

    PLAY_ACTIVITY: 'PLAY_ACTIVITY',
    PLAY_ANY_ACTIVITY: 'PLAY_ANY_ACTIVITY',
    STEAL_ACTIVITY: 'STEAL_ACTIVITY',
    STEAL_ANY_ACTIVITY: 'STEAL_ANY_ACTIVITY',
    DISCARD_ACTIVITY: 'DISCARD_ACTIVITY',
    DISCARD_ANY_ACTIVITY: 'DISCARD_ANY_ACTIVITY'
};

export const QUEST_MODE = {
    TRIGGER: 'TRIGGER',
    AUTO_TRIGGER: 'AUTO_TRIGGER'
};

export type QuestMode = typeof QUEST_MODE.TRIGGER | typeof QUEST_MODE.AUTO_TRIGGER;

export type QuestConditionType =
    typeof QUEST_CONDITION.CLAIM_FIELD |
    typeof QUEST_CONDITION.CLAIM_ANY_FIELDS |
    typeof QUEST_CONDITION.DEFEND_ANY_FIELDS |
    typeof QUEST_CONDITION.DEFEND_FIELD |
    typeof QUEST_CONDITION.CLAIM_RESOURCE |
    typeof QUEST_CONDITION.CLAIM_ANY_RESOURCE |
    typeof QUEST_CONDITION.PLAY_ACTIVITY |
    typeof QUEST_CONDITION.PLAY_ANY_ACTIVITY |
    typeof QUEST_CONDITION.STEAL_ACTIVITY |
    typeof QUEST_CONDITION.STEAL_ANY_ACTIVITY |
    typeof QUEST_CONDITION.DISCARD_ACTIVITY |
    typeof QUEST_CONDITION.DISCARD_ANY_ACTIVITY;





