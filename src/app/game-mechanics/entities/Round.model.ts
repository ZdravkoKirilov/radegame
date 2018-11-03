import { BaseModel } from './Base.model';
import { Stage } from './Stage.model';
import { Phase } from './Phase.model';
import { Stack } from './Stack.model';
import { Pool } from './Pool.model';

export type Round = BaseModel & Partial<{
    stage: number | Stage;

    replay_count: number;
    repeat: number;

    phases: number[] | Phase[];
    phase_order: string;

    condition: number[] | Stack[];
    penalty: number[] | Stack[];
    award: number[] | Stack[];

    income: number[] | Stack[];
    effect_pool: number[] | Pool[];
}>

export type RoundList = {
    [key: string]: Round;
}
