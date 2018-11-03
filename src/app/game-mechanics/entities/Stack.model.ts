import { BaseModel } from "./Base.model";
import { GameAction } from "./Action.model";
import { Condition } from "./Condition.model";
import { Choice } from "./Choice.model";
import { Token } from "./Token.model";
import { Resource } from "./Resource.model";

export type Stack = BaseModel & Partial<{

    mode: StackMode;
    quota: StackQuota;
    pick: StackPick;

    items: StackItem[];
}>;

export type StackItem = {
    id: number;
    owner: number;

    action: number | GameAction;
    condition: number | Condition;
    choice: number | Choice;
    token: number | Token;
    resource: number | Resource;

    amount: number;
    max_amount: number;
    min_amount: number;

    relation: StackRelation;
}

export const STACK_MODES = {
    'PICK': 'PICK',
    'AUTO': 'AUTO',
}

export const STACK_QUOTA = {
    'REPEATING': 'REPEATING',
    'ONCE': 'ONCE'
}

export const STACK_PICK = {
    'RANDOM': 'RANDOM',
    'CHOICE': 'CHOICE'
}

export const STACK_RELATIONS = {
    AND: 'AND',
    OR: 'OR',
    NOT: 'NOT'
};

export type StackRelation = keyof typeof STACK_RELATIONS;
export type StackMode = keyof typeof STACK_MODES;
export type StackQuota = keyof typeof STACK_QUOTA;
export type StackPick = keyof typeof STACK_PICK;

export type StackList = { [key: string]: Stack };