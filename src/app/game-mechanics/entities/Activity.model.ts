export interface ActivityConfig {
    id?: number;
    type?: ActivityType;
    target?: ActivityTarget;
    amount?: number;
    resource?: number;
}

export interface Activity {
    id?: number;
    game?: number;
    name?: string;
    mode?: ActivityMode;
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

export const ACTIVITY_TYPE = {
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
export const ACTION_MODE = {
    TRIGGER: 'TRIGGER',
    AUTO_TRIGGER: 'AUTO_TRIGGER'
};

export const TARGET_TYPE = {
    FIELD: 'FIELD',
    PLAYER: 'PLAYER',
    OTHER_PLAYER: 'OTHER_PLAYER',
    SELF: 'SELF',
    ACTIVE_PLAYER: 'ACTIVE_PLAYER',
};

export type ActivityTarget =
    typeof TARGET_TYPE.FIELD |
    typeof TARGET_TYPE.PLAYER |
    typeof TARGET_TYPE.OTHER_PLAYER |
    typeof TARGET_TYPE.SELF |
    typeof TARGET_TYPE.ACTIVE_PLAYER;

export type ActivityMode =
    typeof ACTION_MODE.TRIGGER |
    typeof ACTION_MODE.AUTO_TRIGGER;

export type ActivityType =
    typeof ACTIVITY_TYPE.WIN_GAME |
    typeof ACTIVITY_TYPE.LOSE_GAME |
    typeof ACTIVITY_TYPE.MOVE |
    typeof ACTIVITY_TYPE.ALTER_RESOURCE |
    typeof ACTIVITY_TYPE.COLLECT_RESOURCES |
    typeof ACTIVITY_TYPE.PREPARE_RESOURCE |
    typeof ACTIVITY_TYPE.STORE_RESOURCE |
    typeof ACTIVITY_TYPE.GIVE_HINT |
    typeof ACTIVITY_TYPE.REQUEST_HINT |
    typeof ACTIVITY_TYPE.DRAW;


