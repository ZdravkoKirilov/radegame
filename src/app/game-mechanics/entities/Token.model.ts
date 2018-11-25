import { BaseModel, WithPermissions, WithCost, WithReveal } from "./Base.model";

export type Token = BaseModel & WithPermissions & WithCost & WithReveal & Partial<{
    attributes: number; // Source with passive mode
}>;