import { BaseModel, WithKeywords } from "./Base.model";

export type Source = BaseModel & WithKeywords & Partial<{

    pick: SourcePickMode;
    quota: SourceQuotaMode;

    group: number; // Group
}>

export const SOURCE_PICK = {
    RANDOM: 'RANDOM',
    CHOICE: 'CHOICE',
};

export const SOURCE_QUOTA = {
    ONCE: 'ONCE',
    ON_TURN: 'ON_TURN',
    ON_PHASE: 'ON_PHASE',
    ON_ROUND: 'ON_ROUND',
};

export type SourcePickMode = keyof typeof SOURCE_PICK;
export type SourceQuotaMode = keyof typeof SOURCE_QUOTA;