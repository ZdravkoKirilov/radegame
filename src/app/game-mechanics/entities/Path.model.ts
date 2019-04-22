import { BaseModel, WithPermissions, WithSetups } from "./Base.model";

export type PathEntity = BaseModel & WithPermissions & WithSetups & Partial<{
    owner: number; // Stage

    from_slot: number;
    to_slot: number;
}>

