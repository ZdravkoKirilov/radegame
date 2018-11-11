import { BaseModel, WithBoard, WithCondition, WithStakes } from './Base.model';

export type Round = BaseModel & WithBoard & WithCondition & WithStakes & Partial<{
    stage: number; // Stage

    replay_count: number;
    repeat: number;

    phases: number[]; // Phase[]
    phase_order: string;

}>