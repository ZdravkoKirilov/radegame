import { BaseModel, WithBoard } from './Base.model';
import { Omit } from '@app/shared';
import { ExpressionFunc } from './Expression.model';
import { Stage } from './Stage.model';

export type Round = BaseModel & WithBoard & Partial<{
    phases: number[]; // Phase[]

    preload: string;
    load_done: string;
    loader: number;
}>;

export type RuntimeRound = Round & Omit<Round, 'preload' | 'load_done'> & {
    preload: ExpressionFunc<void>;
    load_done: ExpressionFunc<boolean>;
    loader: Stage;
    board: Stage;
};

export type PhaseSlot = Partial<{
    owner: number;
    phase: number;
}>;