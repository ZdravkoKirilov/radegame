export const types = {
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

    PEEK_QUESTS: 'PEEK_QUESTS',
    PEEK_ACTIVITIES: 'PEEK_ACTIVITIES'
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
    typeof types.ATTACK_FIELD |
    typeof types.DEFEND_FIELD |
    typeof types.MINE_RESOURCES |
    typeof types.ALTER_RESOURCE |
    typeof types.CANCEL_ATTACK_FIELD |
    typeof types.CANCEL_DEFEND_FIELD |
    typeof types.CANCEL_MINE_RESOURCE |
    typeof types.STEAL_QUEST |
    typeof types.DRAW_QUEST |
    typeof types.DISCARD_QUEST |
    typeof types.STEAL_ACTIVITY |
    typeof types.DISCARD_ACTIVITY |
    typeof types.PEEK_ACTIVITIES |
    typeof types.PEEK_QUESTS;
