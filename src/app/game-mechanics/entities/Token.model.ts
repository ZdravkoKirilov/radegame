import { BaseModel, WithPermissions, WithCost, WithReveal, WithSettings } from "./Base.model";

export type Token = BaseModel & WithPermissions & WithCost & WithReveal & WithSettings & Partial<{
    value: number; // Source with passive mode // used dfor character attributes, or being able to have 1 token of type gold coin, but 5 in amount
}>;