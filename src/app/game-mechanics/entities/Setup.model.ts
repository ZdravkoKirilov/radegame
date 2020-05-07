import { BaseModel } from "./Base.model";

export type Setup = BaseModel & Partial<{
    min_players: number;
    max_players: number;
    recommended_age: number;
}>;