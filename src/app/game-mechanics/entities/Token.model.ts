import { BaseModel, WithPermissions, WithCost, WithReveal, WithSettings, WithKeywords } from "./Base.model";

export type Token = BaseModel & WithPermissions & WithCost & WithReveal & WithSettings & WithKeywords & Partial<{
    value: number; // Source with passive mode // used dfor character attributes, or being able to have 1 token of type gold coin, but 5 in amount
    calculated_value: number; // Expression, for showing score
}>;