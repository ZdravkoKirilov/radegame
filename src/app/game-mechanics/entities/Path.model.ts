import { BaseModel, WithPermissions, WithBoard, WithRisk, WithSettings } from "./Base.model";

export type PathEntity = BaseModel & WithPermissions & WithBoard & WithRisk & WithSettings & Partial<{
    owner: number; // Stage

    from_loc: number;
    to_loc: number;
}>

