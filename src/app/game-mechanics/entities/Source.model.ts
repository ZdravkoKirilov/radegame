import { BaseModel, WithPermissions, WithCost } from "./Base.model";

export type Source = BaseModel & WithPermissions & WithCost & Partial<{

    mode: SourceMode;
    pick: SourcePickMode;
    quota: SourceQuotaMode;

    items: SourceItem[];
}>

export type SourceItem = Partial<{
    id: number;
    owner: number;

    action: number; //GameAction;
    condition: number; //Condition;
    choice: number; //Choice;
    token: number; //Token;
    source: number; // Source

    relation: SourceRelation;
}>

export const SOURCE_MODES = {
    DRAW: 'DRAW',
    AUTO: 'AUTO',
};

export const SOURCE_PICK = {
    RANDOM: 'RANDOM',
    CHOICE: 'CHOICE'
};

export const SOURCE_QUOTA = {
    ONCE: 'ONCE',
    ON_TURN: 'ON_TURN',
    ON_PHASE: 'ON_PHASE',
    ON_ROUND: 'ON_ROUND',
};

export const SOURCE_RELATION = {
    NONE: 'NONE',
    AND: 'AND',
    OR: 'OR',
    NOT: 'NOT'
};

export type SourceMode = keyof typeof SOURCE_MODES;
export type SourcePickMode = keyof typeof SOURCE_PICK;
export type SourceQuotaMode = keyof typeof SOURCE_QUOTA;
export type SourceRelation = keyof typeof SOURCE_RELATION;