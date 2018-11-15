import { BaseModel, WithPermissions, WithBoard, WithCost, WithStakes, WithReveal, WithSettings } from './Base.model';

export type Condition = BaseModel & WithPermissions & WithBoard &
    WithCost & WithStakes & WithReveal & WithSettings & Partial<{

        mode: ConditionMode;

        clauses: number[]; // Clause[];
    }>

export type ClauseItem = Partial<{
    id: number;
    owner: number; // Condition;

    clause: Clause;
    type: string; // comma separated list of targets

    condition: number; //Condition;
    action: number; //GameAction;
    token: number; //Token;
    choice: number; //Choice;
    faction: number; //Faction;
    field: number; //Field;
    phase: number; //Phase;
    team: number; //Team;
    round: number; // Round
    path: number; // Path
    slot: number; // Slot

    keywords: string;

    amount: number;

    relation: ClauseRelation;
}>

export const CLAUSE = {

    INTERSECT: 'INTERSECT', // meet / avoid

    COMPLETE: 'COMPLETE',

    HAVE: 'HAVE',
    IS: 'IS', // "NOT" is achieved via relation: NOT

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

export type ConditionMode = keyof typeof CONDITION_MODES;
export type ClauseRelation = keyof typeof CLAUSE_RELATIONS;
export type Clause = keyof typeof CLAUSE;
export type ClauseType = keyof typeof CLAUSE_TYPE;






