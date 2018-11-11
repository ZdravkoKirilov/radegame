import { BaseModel, WithBoard, WithCost, WithRisk } from "./Base.model";

export type Field = BaseModel & WithBoard & WithCost & WithRisk;
