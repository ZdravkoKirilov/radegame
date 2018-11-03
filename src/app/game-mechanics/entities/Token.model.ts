import { BaseModel } from "./Base.model";
import { LocationEntity } from "./Location.model";
import { Pool } from "./Pool.model";
import { Stack } from "./Stack.model";

export type Token = BaseModel & Partial<{

    start: number | LocationEntity;
    effect_pool: number[] | Pool[];
    income: number[] | Stack[];
    restricted: number[] | Stack[];
    allowed: number[] | Stack[];

}>

export type TokenList = {
    [key: string]: Token;
}