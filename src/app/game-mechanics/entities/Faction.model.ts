import { BaseModel } from "./Base.model";

export type Faction = BaseModel & Partial<{
    stages: number[];
}>;

