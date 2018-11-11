import { BaseModel, WithPermissions, WithBoard, WithCost, WithStakes } from './Base.model';
import { EntityType } from './types';

export type Condition = BaseModel & WithPermissions & WithBoard & WithCost & WithStakes & Partial<{

    mode: ConditionMode;

    clauses: number[]; // Clause[];
}>

export type Clause = Partial<{
    id: number;
    owner: number; // Condition;

    type: ClauseType;
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

export const CLAUSE_TYPE = {
    'CLAIM': 'CLAIM',
    'REACH': 'REACH',
    'MEET': 'MEET',
    'AVOID': 'AVOID',
    'COMPLETE': 'COMPLETE',
    'PLAY': 'PLAY',
    'PLAY_MAX': 'PLAY_MAX',
    'HAVE': 'HAVE',
    'HAVE_MAX': 'HAVE_MAX',
    'HAVE_MORE': 'HAVE_MORE',
    'HAVE_LESS': 'HAVE_LESS',
    'IS': 'IS',
    'IS_BEFORE': 'IS_BEFORE',
    'IS_AFTER': 'IS_AFTER',
}

export const CLAUSE_RELATIONS = {
    'AND': 'AND',
    'OR': 'OR',
    'NOT': 'NOT',
}

export const CONDITION_MODES = {
    'TRAP': 'TRAP',
    'TRIGGER': 'TRIGGER',
    'HYBRID': 'HYBRID',
    'AUTO': 'AUTO',
}

type ConditionMode = keyof typeof CONDITION_MODES;
type ClauseRelation = keyof typeof CLAUSE_RELATIONS;
type ClauseType = keyof typeof CLAUSE_TYPE;






