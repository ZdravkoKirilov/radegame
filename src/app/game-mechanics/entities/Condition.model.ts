import { BaseModel, WithPermissions, WithBoard, WithCost, WithStakes, WithReveal, WithKeywords } from './Base.model';

export type Condition = BaseModel & Partial<{
    mode: ConditionMode;
    clauses: number[]; // Clause[];
}>

export type ClauseItem = Partial<{
    id: number;
    owner: number; // Condition;

    clause: Clause;

    negative: boolean; // "NOT" mechanics

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
    WIN_BID: 'WIN_BID',
    LOSE_BID: 'LOSE_BID',

    COMPLETE: 'COMPLETE', // other condition(quest)
    INTERSECT: 'INTERSECT', // meet / avoid

    GAIN: 'GAIN', // slot, field, KEYWORD?
    REACH: 'REACH', // slot, resources

    TRIGGER: 'TRIGGER', // action
    REVEAL: 'REVEAL', // when a card gets revealed

    DISTANCE_IS: 'DISTANCE_IS',
    DISTANCE_IS_MORE: 'DISTANCE_IS_MORE',
    DISTANCE_IS_LESS: 'DISTANCE_IS_LESS',

    IS_REVEALED: 'IS_REVEALED', // for settings rule enforcement

}

export const CLAUSE_RELATIONS = {
    AND: 'AND',
    OR: 'OR',
}

export const CONDITION_MODES = {
    TRIGGER: 'TRIGGER',
    AUTO: 'AUTO',
    PASSIVE: 'PASSIVE',
    RULE: 'RULE',
}

export type ConditionMode = keyof typeof CONDITION_MODES;
export type ClauseRelation = keyof typeof CLAUSE_RELATIONS;
export type Clause = keyof typeof CLAUSE;






