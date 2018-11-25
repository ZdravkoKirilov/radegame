import { BaseModel, WithBoard, WithSettings, WithSetups } from "./Base.model";

export type Faction = BaseModel & WithBoard & WithSettings & WithSetups;

