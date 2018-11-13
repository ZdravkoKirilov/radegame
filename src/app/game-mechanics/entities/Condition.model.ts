import { BaseModel, WithPermissions, WithBoard, WithCost, WithStakes, WithReveal, WithSettings } from './Base.model';
import { EntityType } from './types';

export type Condition = BaseModel & WithPermissions & WithBoard &
    WithCost & WithStakes & WithReveal & WithSettings & Partial<{

        mode: ConditionMode;

        clauses: number[]; // Clause[];
    }>

export type Clause = Partial<{
    id: number;
    owner: number; // Condition;

    type: Clause;
    target_entity: EntityType;

    condition: number; //Condition;
    action: number; //GameAction;
    token: number; //Token;
    choice: number; //Choice;
    faction: number; //Faction;
    field: number; //Field;
    phase: number; //Phase;
    team: number; //Team;
    location: number; // Location
    round: number; // Round
    path: number; // Path

    keywords: string;

    amount: number;

    relation: ClauseRelation;
}>

export const CLAUSE = {

    INTERSECT: 'INTERSECT', // meet / avoid

    COMPLETE: 'COMPLETE',

    HAVE: 'HAVE',
    IS: 'IS',

    GAIN: 'GAIN',
    REACH: 'REACH',

    TRIGGER: 'TRIGGER',
    REVEAL: 'REVEAL',
}

export const CLAUSE_TYPE = {
    MORE: 'MORE',
    LESS: 'LESS',

    MAX: 'MAX',
    MIN: 'MIN',

    BEFORE: 'BEFORE',
    AFTER: 'AFTER',
    AT: 'AT',

    CORRECT: 'CORRECT',
    INCORRECT: 'INCORRECT',
}

export const CLAUSE_RELATIONS = {
    AND: 'AND',
    OR: 'OR',
    NOT: 'NOT',
}

export const CONDITION_MODES = {
    TRIGGER: 'TRIGGER',
    HYBRID: 'HYBRID',
    AUTO: 'AUTO',
    RULE: 'RULE',
}

type ConditionMode = keyof typeof CONDITION_MODES;
type ClauseRelation = keyof typeof CLAUSE_RELATIONS;
type Clause = keyof typeof CLAUSE;






