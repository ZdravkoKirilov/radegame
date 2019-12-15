import { BaseModel, WithBoard } from './Base.model';
import { Omit } from '@app/shared';
import { ExpressionFunc } from './Expression.model';

export type Round = BaseModel & WithBoard & Partial<{
    phases: number[]; // Phase[]

    preload: string;
    load_done: string;
}>;

export type RuntimeRound = Round & Omit<Round, 'preload' | 'load_done'> & {
    preload: ExpressionFunc;
    load_done: ExpressionFunc;
};

export type PhaseSlot = Partial<{
    owner: number;
    phase: number;
}>;