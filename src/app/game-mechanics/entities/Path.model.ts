import { BaseModel, WithPermissions, WithBoard, WithRisk, WithStakes, WithCost, WithSetups } from "./Base.model";

export type PathEntity = BaseModel & WithPermissions & WithBoard & WithRisk & WithStakes & WithCost & WithSetups & Partial<{
    owner: number; // Stage

    from_slot: number;
    to_slot: number;
}>

