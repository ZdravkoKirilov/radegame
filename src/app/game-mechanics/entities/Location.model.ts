import { BaseModel, WithPermissions, WithBoard, WithRisk, WithSettings } from "./Base.model";

export type LocationEntity = BaseModel & WithPermissions & WithBoard & WithRisk & WithSettings & Partial<{
    owner: number; // Stage;

    field: number; // Field;
    tokens: number[]; // Token[];

    y: number;
    x: number;
    width: number;
    height: number;
}>