import { BaseModel, WithBoard, WithDisplayName, WithDone } from './Base.model';

export type Round = BaseModel & WithBoard & WithDisplayName & WithDone & Partial<{
    phases: number[]; // Phase[]
}>

export type PhaseSlot = Partial<{
    owner: number;
    phase: number;
}>;
