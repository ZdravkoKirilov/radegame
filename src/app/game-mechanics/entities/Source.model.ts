import { BaseModel } from "./Base.model";
import { Choice } from "./Choice.model";
import { GameAction } from "./Action.model";
import { Condition } from "./Condition.model";
import { Token } from "./Token.model";

export type Source = BaseModel & Partial<{

    mode: SourceMode;
    pick: SourcePickMode;
    quota: SourceQuotaMode;

    items: SourceItem[];
}>

export type SourceItem = Partial<{
    id: number;
    owner: number;

    action: number | GameAction;
    condition: number | Condition;
    choice: number | Choice;
    token: number | Token;
    source: number; // Source

    restricted: number[] | Condition[];
    allowed: number[] | Condition[];

    cost: number[] | Source[];
    relation: SourceRelation;
}>

export const SOURCE_MODES = {
    DRAW: 'DRAW',
    AUTO: 'AUTO',
};

export type SourceMode = keyof typeof SOURCE_MODES;

export const SOURCE_PICK = {
    RANDOM: 'RANDOM',
    CHOICE: 'CHOICE'
};

export type SourcePickMode = keyof typeof SOURCE_PICK;

export const SOURCE_QUOTA = {
    ONCE: 'ONCE',
    REPEATING: 'REPEATING'
};

export type SourceQuotaMode = keyof typeof SOURCE_QUOTA;

export const SOURCE_RELATION = {
    NONE: 'NONE',
    AND: 'AND',
    OR: 'OR',
    NOT: 'NOT'
};

export type SourceRelation = keyof typeof SOURCE_RELATION;