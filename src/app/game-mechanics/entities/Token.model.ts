import { BaseModel, WithKeywords } from "./Base.model";

export type Token = BaseModel & WithKeywords & Partial<{
    value: number; // Expression
}>;