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
    target_type: ActionTargetType;

    value: string;
    computed_value: ActionComputedValue;

    amount: number; // polymorphed label: Amount/Size/Range
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

    ALTER: 'ALTER', // resource. Others: target: token -> way to boost units' power. Also keywords with +/- notation
    // or just remove their ability (attribute) to fight

    GAIN: 'GAIN', // field / slot
    CLOSE: 'CLOSE', // slot, path

    GAMBLE: 'GAMBLE', // may require more fields?

    BID: 'BID',  // used for fighting.
};

export const ACTION_MODE = {
    TRIGGER: 'TRIGGER',
    AUTO: 'AUTO', // onstep @ revealed, onstep @ hidden when field/loc. Revealed when on faction
    PASSIVE: 'PASSIVE',

    HYBRID: 'HYBRID',
};

export const ACTION_TARGET = {
    PLAYER: 'PLAYER',
    FACTION: 'FACTION',
    KEYWORD: 'KEYWORD',
    TEAM: 'TEAM',
    TOKEN: 'TOKEN',
    SLOT: 'SLOT',
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

    ALL_FRIENDLY: 'ALL_FRIENDLY',
    TARGET_FRIENDLY: 'TARGET_FRIENDLY',
    ALL_ENEMY: 'ALL_ENEMY',
    TARGET_ENEMY: 'TARGET_ENEMY',

    COST: 'COST',
}

export const COMPUTED_VALUES = {
    BID_DIFFERENCE: 'BID_DIFFERENCE', // "trample"
    HOP_RANGE: 'HOP_RANGE', // drawback/cost for hopping
}

export type ActionTarget = keyof typeof ACTION_TARGET;

export type ActionTargetType = keyof typeof ACTION_TARGET_TYPE;

export type ActionMode = keyof typeof ACTION_MODE;

export type ActionType = keyof typeof ACTION_TYPE;

export type ActionComputedValue = keyof typeof COMPUTED_VALUES;

// increase power => ALTER TOKEN ALL_FRIENDLY AMOUNT #power

// increase cost => ALTER TOKEN/CONDITION/ACTION ALL_ENEMY AMOUNT #resource

// Happens either with providing the required resource directly or via token with attributes.
// Type: Action, Target: OtherPlayer. Currency: either certain token type or keywords. Picking what to use: runtime based UI.
// Condition of type BID: compose results. Could be placed by 'settings' prop @ Faction or the Action itself


