import { BaseModel, WithPermissions, WithBoard, WithRisk } from "./Base.model";

export type LocationEntity = BaseModel & WithPermissions & WithBoard & WithRisk & Partial<{
    owner: number; // Stage;

    field: number; // Field;
    tokens: number[]; // Token[];
    source: number; // Source;

    y: number;
    x: number;
    width: number;
    height: number;
}>