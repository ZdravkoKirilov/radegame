import { BaseModel } from "./Base.model";
import { Pool } from "./Pool.model";
import { Stack } from "./Stack.model";

export type Team = BaseModel & Partial<{
    min_players: number;
    max_players: number;

    effect_pool: number[] | Pool[];
    income: number[] | Stack[];
}>

export type TeamList = {
    [key: string]: Team;
}