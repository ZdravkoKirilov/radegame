import { BaseModel } from "./Base.model";

export type Setup = BaseModel & Partial<{
    min_players: number;
    max_players: number;
    recommended_age: number;

    rounds: RoundSlot[]; // RoundSlot[]
}>;

export type RoundSlot = Partial<{
    id: number;
    owner: number;
    round: number;
}>;