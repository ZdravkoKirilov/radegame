import { BaseModel, WithPermissions, WithCost, WithReveal, WithCondition } from "./Base.model";

export type Token = BaseModel & WithPermissions & WithCost & WithReveal & WithCondition & Partial<{
    attributes: number; // Source with passive mode
}>;