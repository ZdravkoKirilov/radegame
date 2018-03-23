import { Activity } from './index';

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
    type?: QuestConditionTypes;
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

export const QUEST_CONDITIONS = {
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
export type QuestConditionTypes =
    typeof QUEST_CONDITIONS.CLAIM_FIELD |
    typeof QUEST_CONDITIONS.CLAIM_ANY_FIELDS |
    typeof QUEST_CONDITIONS.DEFEND_ANY_FIELDS |
    typeof QUEST_CONDITIONS.DEFEND_FIELD |
    typeof QUEST_CONDITIONS.CLAIM_RESOURCE |
    typeof QUEST_CONDITIONS.CLAIM_ANY_RESOURCE |
    typeof QUEST_CONDITIONS.PLAY_ACTIVITY |
    typeof QUEST_CONDITIONS.PLAY_ANY_ACTIVITY |
    typeof QUEST_CONDITIONS.STEAL_ACTIVITY |
    typeof QUEST_CONDITIONS.STEAL_ANY_ACTIVITY |
    typeof QUEST_CONDITIONS.DISCARD_ACTIVITY |
    typeof QUEST_CONDITIONS.DISCARD_ANY_ACTIVITY;





