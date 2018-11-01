import { BaseModel } from "./Base.model";

export type Token = BaseModel & Partial<{

    resource_limit: number;

    start: number;

    effect_pool: number[];
}>

export type TokenList = {
    [key: string]: Token;
}