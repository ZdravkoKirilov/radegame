import { BaseModel } from "./Base.model";

export type Setup = BaseModel & Partial<{
    min_players: number;
    max_players: number;
    recommended_age: number;

    rounds: number[]; // RoundSlot[]
}>;

export type RoundSlot = Partial<{
    owner: number;
    round: number;
    done: number; // Expression
}>;