import { BaseModel, WithBoard, WithStakes, WithCost, WithRisk, WithKeywords, WithStates } from "./Base.model";

export type Field = BaseModel & WithBoard & WithCost & WithRisk & WithStakes & WithKeywords & WithStates;
