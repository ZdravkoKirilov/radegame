import { BaseModel, WithStakes, WithFrames, WithDisplayName } from './Base.model';

export type Condition = BaseModel & WithStakes & WithDisplayName & WithFrames & Partial<{
    clause: number; // Expression
}>;






