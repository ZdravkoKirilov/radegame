import { BaseModel, WithBoard, WithCondition, WithStakes, WithRisk } from './Base.model';

export type Round = BaseModel & WithBoard & WithCondition & WithStakes & WithRisk & Partial<{
    stage: number; // Stage

    replay_limit: number; // how many tries to pass condition

    repeat: number;   // how many times the round will be played again as a whole

    phases: number[]; // Phase[]
    phase_order: string;

}>

// WithRisk = when a try fails. Undone - when all trials are done
// per faction condition: part of WithCondition -> condition allowed for the faction / team