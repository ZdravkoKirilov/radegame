import { BaseModel, WithStakes } from './Base.model';

export type Condition = BaseModel & WithStakes & Partial<{
    mode: ConditionMode;
    clauses: number[]; // Clause[];
}>

export type ClauseItem = Partial<{
    id: number;
    owner: number; // Condition;

    clause: number; // Expression
    value: number;

    relation: ClauseRelation;
}>

export const CLAUSE_RELATIONS = {
    AND: 'AND',
    OR: 'OR',
}

export const CONDITION_MODES = {
    TRIGGER: 'TRIGGER',
    PASSIVE: 'PASSIVE',
    RULE: 'RULE',
}

export type ConditionMode = keyof typeof CONDITION_MODES;
export type ClauseRelation = keyof typeof CLAUSE_RELATIONS;






