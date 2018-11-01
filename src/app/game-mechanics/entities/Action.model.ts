import { Stack } from "./Stack.model";
import { Resource } from "./Resource.model";
import { Condition } from "./Condition.model";
import { Choice } from "./Choice.model";
import { Faction } from "./Faction.model";
import { BaseModel } from "./Base.model";
import { Token } from "./Token.model";

export type GameAction = BaseModel & Partial<{

    mode: ActionMode;

    cost: number[] | Stack[];
    condition: number[] | Stack[];
    restricted: number[] | Stack[];
    allowed: number[] | Stack[];

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

    resource: number | Resource;
    condition: number | Condition;
    choice: number | Choice;
    faction: number | Faction;
    token: number | Token;
    action: number | GameAction;
    keywords: string;
}>

export type ActionList = {
    [key: string]: GameAction;
}

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

export const TARGET_TYPE = {
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

export type ActionTarget = keyof typeof TARGET_TYPE;

export type ActionMode = keyof typeof ACTION_MODE;

export type ActionType = keyof typeof ACTION_TYPE;


