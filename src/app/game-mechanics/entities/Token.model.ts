import { BaseModel, WithPermissions, WithBoard, WithCost, WithReveal } from "./Base.model";

export type Token = BaseModel & WithPermissions & WithBoard & WithCost & WithReveal;