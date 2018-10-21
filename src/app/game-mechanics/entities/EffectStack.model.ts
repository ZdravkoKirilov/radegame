import { BaseModel } from "./Base.model";

export type EffectStack = BaseModel & Partial<{

    action: number;
    condition: number;

    relation: StackRelation;
}>;

export const StackRelations = {
    AND: 'AND',
    OR: 'OR',
    NOT: 'NOT'
};

export type StackRelation = keyof typeof StackRelations;

export type StackList = {[key: string]: EffectStack};