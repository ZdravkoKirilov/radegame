import { BaseModel, WithBoard, WithSettings, WithSetups } from "./Base.model";

export type Team = BaseModel & WithBoard & WithSettings & WithSetups;