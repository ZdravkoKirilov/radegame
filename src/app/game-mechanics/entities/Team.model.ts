import { BaseModel, WithBoard, WithSettings, WithSetups, WithKeywords } from "./Base.model";

export type Team = BaseModel & WithBoard & WithSettings & WithSetups & WithKeywords;