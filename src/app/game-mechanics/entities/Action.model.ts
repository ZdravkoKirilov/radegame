import { BaseModel, WithPermissions, WithCost, WithCondition, WithReveal, WithSettings } from "./Base.model";

export type GameAction = BaseModel & WithPermissions & WithCost & WithCondition & WithReveal & WithSettings & Partial<{

    mode: ActionMode;

    configs: ActionConfig[];
}>

export type ActionConfig = Partial<{
    id: number;
    owner: number | GameAction;

    type: ActionType;
    target: ActionTarget;

    value: string;

    amount: number;
    max_amount: number;
    min_amount: number;
    random_amount: boolean;

    condition: number; // Condition;
    choice: number; //Choice;
    faction: number; //Faction;
    token: number; //Token;
    action: number; //GameAction;
    keywords: string;
}>

export const ACTION_TYPE = {

    WIN_GAME: 'WIN_GAME',
    LOSE_GAME: 'LOSE_GAME',

    MOVE: 'MOVE',
    HOP: 'HOP', // teleport

    DRAW: 'DRAW',
    REVEAL: 'REVEAL',
    RETURN: 'RETURN',
    DISCARD: 'DISCARD',
    DROP: 'DROP',

    ALTER: 'ALTER',

    GAIN: 'GAIN',

    GAMBLE: 'GAMBLE', // may require more fields?
};

export const ACTION_MODE = {
    TRIGGER: 'TRIGGER',
    AUTO: 'AUTO', // onstep @ revealed, onstep @ hidden when field/loc. Revealed when on faction

    HYBRID: 'HYBRID',
};

export const ACTION_TARGET = {
    PLAYER: 'PLAYER',
    FACTION: 'FACTION',
    KEYWORD: 'KEYWORD',
    TEAM: 'TEAM',
    TOKEN: 'TOKEN',
    LOCATION: 'LOCATION',
    PATH: 'PATH',
};

export const ACTION_TARGET_TYPE = {
    SELF: 'SELF',
    ACTIVE: 'ACTIVE',
    OTHER_TARGET: 'OTHER_TARGET',
    TARGET: 'TARGET',
    INVOLVED: 'INVOLVED',
    OTHER_INVOLVED: 'OTHER_INVOLVED',
    OPPONENT: 'OPPONENT',
    TEAMMATE: 'TEAMMATE',
}

export type ActionTarget = keyof typeof ACTION_TARGET;

export type ActionTargetType = keyof typeof ACTION_TARGET_TYPE;

export type ActionMode = keyof typeof ACTION_MODE;

export type ActionType = keyof typeof ACTION_TYPE;


