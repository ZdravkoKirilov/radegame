import { BaseModel } from './Base.model';
import { Stack } from './Stack.model';
import { GameAction } from './Action.model';
import { Resource } from './Resource.model';
import { Faction } from './Faction.model';
import { Choice } from './Choice.model';
import { Field } from './Field.model';
import { Token } from '@angular/compiler';
import { EntityType } from './types';
import { Phase } from './Phase.model';
// import { Stack } from './Stack.model';

export type Condition = BaseModel & Partial<{

    mode: ConditionMode;

    award: number[] | Stack[];
    penalty: number[] | Stack[];

    restricted: number[] | Stack[];
    allowed: number[] | Stack[];

    clauses: number[] | Clause[];
}>

export interface ConditionList {
    [key: string]: Condition;
}

export type Clause = Partial<{
    id: number;
    owner: number | Condition;

    type: ClauseType;
    target_entity: EntityType;

    condition: number | Condition;
    action: number | GameAction;
    resource: number | Resource;
    token: number | Token;
    choice: number | Choice;
    faction: number | Faction;
    field: number | Field;
    phase: number | Phase;
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






