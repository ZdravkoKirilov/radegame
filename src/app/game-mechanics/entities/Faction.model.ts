import { BaseModel, WithBoard, WithSettings, WithSetups, WithKeywords } from "./Base.model";

export type Faction = BaseModel & WithBoard & WithSettings & WithSetups & WithKeywords;

