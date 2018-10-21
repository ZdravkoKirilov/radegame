import { EffectStack } from "./EffectStack.model";
import { Resource } from "./Resource.model";
import { Condition } from "./Condition.model";
import { Choice } from "./Choice.model";
import { Faction } from "./Faction.model";
import { BaseModel } from "./Base.model";

export type GameAction = BaseModel & Partial<{

    mode: ActionMode;

    cost: number[] | EffectStack[];
    condition: number[] | EffectStack[];
    restriction: number[] | EffectStack[];

    configs: ActionConfig[];
}>

export type ActionConfig = Partial<{
    id: number;
    owner: number | GameAction;

    type: ActionType;
    target: ActionTarget;

    amount: number;

    resource: number | Resource;
    condition: number | Condition;
    choice: number | Choice;
    faction: number | Faction;
    action: number | GameAction;
    keyword: string;
}>

export type ActionList = {
    [key: string]: GameAction;
}

export const QUOTA_TYPE = {
    DISTRIBUTED: 'DISTRIBUTED', // each players gets a share by default
    LIMITED: 'LIMITED'  // each player may draw if available
}

export const ACTION_TYPE = {
    WIN_GAME: 'WIN_GAME',
    LOSE_GAME: 'LOSE_GAME',
    MOVE: 'MOVE', // works as claim also: if field has price
    TRIGGER_QUEST: 'TRIGGER_QUEST',
    TRIGGER_TRIVIA: 'TRIGGER_TRIVIA',
    ALTER: 'ALTER', // resource
    COLLECT: 'COLLECT', // mine resource from field
    DRAW: 'DRAW',
    CANCEL: 'CANCEL',
    REDIRECT: 'REDIRECT'
};
export const ACTION_MODE = {
    TRAP: 'TRAP',
    TRIGGER: 'TRIGGER',
    HYBRID: 'HYBRID'
};

export const TARGET_TYPE = {
    PLAYER: 'PLAYER',
    OTHER_PLAYER: 'OTHER_PLAYER',
    SELF: 'SELF',
    ACTIVE_PLAYER: 'ACTIVE_PLAYER',
    FACTION: 'FACTION',
    KEYWORD: 'KEYWORD'
};

export type ActionTarget = keyof typeof TARGET_TYPE;

export type ActionMode = keyof typeof ACTION_MODE;

export type ActionType = keyof typeof ACTION_TYPE;

export type QuotaType = keyof typeof QUOTA_TYPE;


