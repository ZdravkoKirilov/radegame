import { BaseModel, WithBoard } from "./Base.model";

export type Team = BaseModel & WithBoard & Partial<{
    min_players: number;
    max_players: number;
}>