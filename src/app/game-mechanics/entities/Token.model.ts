import { BaseModel, WithKeywords, WithDisplayName, WithFrames } from "./Base.model";

export type Token = BaseModel & WithKeywords & WithDisplayName & WithFrames & Partial<{
    value: number; // Expression
}>;