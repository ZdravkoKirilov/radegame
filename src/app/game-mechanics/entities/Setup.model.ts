import { BaseModel, WithDisplayName } from "./Base.model";

export type Setup = BaseModel & WithDisplayName & Partial<{
    min_players: number;
    max_players: number;
    recommended_age: number;

    rounds: number[]; // RoundSlot[]
}>;

export type RoundSlot = Partial<{
    owner: number;
    round: number;
}>;