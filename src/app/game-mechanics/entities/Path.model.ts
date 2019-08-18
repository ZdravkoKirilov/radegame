import { BaseModel, WithStyle } from "./Base.model";

export type PathEntity = BaseModel & WithStyle & Partial<{
    owner: number; // Stage

    field: number; // Field. Static field for the location

    from_slot: number;
    to_slot: number;
}>

