import { BaseModel, WithBoard, WithStakes, WithSetups, WithSettings, WithKeywords } from './Base.model';

export type Round = BaseModel & WithBoard & Partial<{
    phases: number[]; // Phase[]
}>

export type PhaseSlot = Partial<{
    owner: number;
    phase: number;
    done: number; // Expression
}>;
