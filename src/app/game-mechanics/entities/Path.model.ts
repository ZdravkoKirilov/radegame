import { BaseModel, WithStyle } from "./Base.model";

export type PathEntity = BaseModel & WithStyle & Partial<{
    owner: number; // Stage

    from_slot: number;
    to_slot: number;
}>

