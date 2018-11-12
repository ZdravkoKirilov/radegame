import { BaseModel, WithPermissions, WithCost, WithCondition, WithReveal } from "./Base.model";

export type GameAction = BaseModel & WithPermissions & WithCost & WithCondition & WithReveal & Partial<{

    mode: ActionMode;
    limit: number;

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
    ALTER_RESOURCE: 'ALTER_RESOURCE',
    DRAW: 'DRAW',
    REDIRECT: 'REDIRECT',
    GAMBLE: 'GAMBLE',
    DROP: 'DROP',
    LOAD: 'LOAD',
    ALTER_KEYWORDS: 'ALTER_KEYWORDS'
};
export const ACTION_MODE = {
    TRAP: 'TRAP',
    TRIGGER: 'TRIGGER',
    HYBRID: 'HYBRID',
    AUTO: 'AUTO',
};

export const ACTION_TARGET = {
    'PLAYER': 'PLAYER',
    'OTHER_PLAYER': 'OTHER_PLAYER',
    'SELF': 'SELF',
    'ACTIVE_PLAYER': 'ACTIVE_PLAYER',
    'FACTION': 'FACTION',
    'KEYWORD': 'KEYWORD',
    'TOKEN': 'TOKEN',
    'ACTIVE_TOKEN': 'ACTIVE_TOKEN',
    'OTHER_TOKEN': 'OTHER_TOKEN'
};

export const ACTION_TARGET_TYPE = {
    SELF: 'SELF',
    ACTIVE: 'ACTIVE',
    OTHER_TARGET: 'OTHER_TARGET',
    TARGET: 'TARGET',
    INVOLVED: 'INVOLVED',
    OTHER_INVOLVED: 'OTHER_INVOLVED',
}

export type ActionTarget = keyof typeof ACTION_TARGET;

export type ActionTargetType = keyof typeof ACTION_TARGET_TYPE;

export type ActionMode = keyof typeof ACTION_MODE;

export type ActionType = keyof typeof ACTION_TYPE;


