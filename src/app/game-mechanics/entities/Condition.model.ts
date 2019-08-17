import { BaseModel, WithStakes } from './Base.model';

export type Condition = BaseModel & WithStakes & Partial<{
    clause: number; // Expression
}>;






