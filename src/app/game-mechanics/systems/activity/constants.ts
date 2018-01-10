export const types = {
    ATTACK_FIELD: 'ATTACK_FIELD',
    DEFEND_FIELD: 'DEFEND_FIELD',
    MINE_RESOURCES: 'MINE_RESOURCES',
};

export const actionModes = {
    TRIGGER: 'TRIGGER',
};

export const targetTypes = {
    FIELD: 'FIELD',
};

export type ActivityTarget =
    typeof targetTypes.FIELD;

export type ActivityMode =
    typeof actionModes.TRIGGER;

export type ActivityType =
    typeof types.ATTACK_FIELD |
    typeof types.DEFEND_FIELD |
    typeof types.MINE_RESOURCES;
