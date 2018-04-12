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
    WIN_GAME: 'WIN_GAME',
    LOSE_GAME: 'LOSE_GAME',
    MOVE: 'MOVE',
    COLLECT_RESOURCES: 'COLLECT_RESOURCES',
    ALTER_RESOURCE: 'ALTER_RESOURCE',
    PREPARE_RESOURCE: 'PREPARE_RESOURCE',
    STORE_RESOURCE: 'STORE_RESOURCE',
    REQUEST_HINT: 'REQUEST_HINT',
    GIVE_HINT: 'GIVE_HINT',
    DRAW: 'DRAW',
};
export const actionModes = {
    TRIGGER: 'TRIGGER',
    AUTO_TRIGGER: 'AUTO_TRIGGER'
};

export const targetTypes = {
    FIELD: 'FIELD',
    PLAYER: 'PLAYER',
    OTHER_PLAYER: 'OTHER_PLAYER',
    SELF: 'SELF',
    ACTIVE_PLAYER: 'ACTIVE_PLAYER',
};

export type ActivityTarget =
    typeof targetTypes.FIELD |
    typeof targetTypes.PLAYER |
    typeof targetTypes.OTHER_PLAYER |
    typeof targetTypes.SELF |
    typeof targetTypes.ACTIVE_PLAYER;

export type ActivityMode =
    typeof actionModes.TRIGGER |
    typeof actionModes.AUTO_TRIGGER;

export type ActivityType =
    typeof activityTypes.WIN_GAME |
    typeof activityTypes.LOSE_GAME |
    typeof activityTypes.MOVE |
    typeof activityTypes.ALTER_RESOURCE |
    typeof activityTypes.COLLECT_RESOURCES |
    typeof activityTypes.PREPARE_RESOURCE |
    typeof activityTypes.STORE_RESOURCE |
    typeof activityTypes.GIVE_HINT |
    typeof activityTypes.REQUEST_HINT |
    typeof activityTypes.DRAW;


