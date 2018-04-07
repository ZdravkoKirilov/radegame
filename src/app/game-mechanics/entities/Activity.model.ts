export interface ActivityConfig {
    id?: number;
    type?: ActivityType;
    mode?: ActivityMode;
    target?: ActivityTarget;
    amount?: number;
    resource?: number;
}

export interface Activity {
    id?: number;
    game?: number;
    name?: string;
    description?: string;
    image?: string;
    cost?: ActivityCost[];
    configs?: ActivityConfig[];
    atRound?: number;
    fromRound?: number;
    byRound?: number;
}

export interface ActivityCost {
    id?: number;
    resource?: number;
    activity?: number;
    amount?: number;
}

export interface ActivityList {
    [key: string]: Activity;
}

export const activityTypes = {
    ATTACK_FIELD: 'ATTACK_FIELD',
    DEFEND_FIELD: 'DEFEND_FIELD',
    MINE_RESOURCES: 'MINE_RESOURCES',

    CANCEL_ATTACK_FIELD: 'CANCEL_ATTACK_FIELD',
    CANCEL_DEFEND_FIELD: 'CANCEL_DEFEND_FIELD',
    CANCEL_MINE_RESOURCE: 'CANCEL_MINE_RESOURCE',

    ALTER_RESOURCE: 'ALTER_RESOURCE',

    STEAL_QUEST: 'STEAL_QUEST',
    DISCARD_QUEST: 'DISCARD_QUEST',
    DRAW_QUEST: 'DRAW_QUEST',

    STEAL_ACTIVITY: 'STEAL_ACTIVITY',
    DISCARD_ACTIVITY: 'DISCARD_ACTIVITY',
    CANCEL_ACTIVITY: 'CANCEL_ACTIVITY',
    DRAW_ACTIVITY: 'DRAW_ACTIVITY',

    PEEK_QUESTS: 'PEEK_QUESTS',
    PEEK_ACTIVITIES: 'PEEK_ACTIVITIES',

    REDIRECT: 'REDIRECT',
    MOVE: 'MOVE'
};
export const actionModes = {
    HIDDEN: 'HIDDEN',
    TRIGGER: 'TRIGGER',
    EFFECT: 'EFFECT',
    PASSIVE: 'PASSIVE',
};

export const targetTypes = {
    FIELD: 'FIELD',
    PLAYER: 'PLAYER',
    OTHER_PLAYER: 'OTHER_PLAYER',
    SELF: 'SELF',
    ACTIVE_FIELD: 'ACTIVE_FIELD',
    ACTIVE_PLAYER: 'ACTIVE_PLAYER',
    OTHER_ACTIVE_PLAYER: 'OTHER_ACTIVE_PLAYER'
};

export type ActivityTarget =
    typeof targetTypes.FIELD |
    typeof targetTypes.PLAYER |
    typeof targetTypes.OTHER_PLAYER |
    typeof targetTypes.SELF |
    typeof targetTypes.ACTIVE_PLAYER |
    typeof targetTypes.OTHER_ACTIVE_PLAYER |
    typeof targetTypes.ACTIVE_FIELD;

export type ActivityMode =
    typeof actionModes.TRIGGER |
    typeof actionModes.PASSIVE |
    typeof actionModes.HIDDEN;

export type ActivityType =
    typeof activityTypes.ATTACK_FIELD |
    typeof activityTypes.DEFEND_FIELD |
    typeof activityTypes.MINE_RESOURCES |
    typeof activityTypes.ALTER_RESOURCE |
    typeof activityTypes.CANCEL_ATTACK_FIELD |
    typeof activityTypes.CANCEL_DEFEND_FIELD |
    typeof activityTypes.CANCEL_MINE_RESOURCE |
    typeof activityTypes.STEAL_QUEST |
    typeof activityTypes.DRAW_QUEST |
    typeof activityTypes.DISCARD_QUEST |
    typeof activityTypes.STEAL_ACTIVITY |
    typeof activityTypes.DISCARD_ACTIVITY |
    typeof activityTypes.PEEK_ACTIVITIES |
    typeof activityTypes.DRAW_ACTIVITY |
    typeof activityTypes.PEEK_QUESTS |
    typeof activityTypes.REDIRECT;


