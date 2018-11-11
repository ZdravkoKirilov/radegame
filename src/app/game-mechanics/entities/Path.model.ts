import { BaseModel, WithPermissions, WithBoard, WithRisk } from "./Base.model";

export type PathEntity = BaseModel & WithPermissions & WithBoard & WithRisk & Partial<{
    owner: number; // Stage

    from_loc: number;
    to_loc: number;
}>

