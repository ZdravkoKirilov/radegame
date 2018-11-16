import { BaseModel } from "./Base.model";
import { Omit } from "@app/shared";

export type Setup = Omit<BaseModel, 'keywords'> & {
    min_players: number;
    max_players: number;
    recommended_age: number;
};