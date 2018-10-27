import { BaseModel } from "./Base.model";
import { GameAction } from "./Action.model";
import { Condition } from "./Condition.model";
import { Choice } from "./Choice.model";
import { Token } from "./Faction.model";
import { Resource } from "./Resource.model";

export type Stack = BaseModel & Partial<{

    action: number | GameAction;
    condition: number | Condition;
    choice: number | Choice;
    token: number | Token;
    resource: number | Resource;

    relation: StackRelation;
}>;

export const StackRelations = {
    AND: 'AND',
    OR: 'OR',
    NOT: 'NOT'
};

export type StackRelation = keyof typeof StackRelations;

export type StackList = {[key: string]: Stack};