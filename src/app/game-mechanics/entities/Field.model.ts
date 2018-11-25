import { BaseModel, WithBoard, WithStakes, WithCost, WithRisk } from "./Base.model";

export type Field = BaseModel & WithBoard & WithCost & WithRisk & WithStakes;
