import { BaseModel, WithPermissions, WithBoard, WithCost } from "./Base.model";

export type Token = BaseModel & WithPermissions & WithBoard & WithCost;