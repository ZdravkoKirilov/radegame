import { BaseModel, WithKeywords } from "./Base.model";

export type Stage = BaseModel & WithKeywords & Partial<{
    width: number;
    height: number;
}>;






