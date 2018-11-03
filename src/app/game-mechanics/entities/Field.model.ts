import { BaseModel } from "./Base.model";
import { Stack } from "./Stack.model";
import { Pool } from "./Pool.model";

export type Field = BaseModel & Partial<{
    stage: number;

    cost: number[] | Stack[];
    award: number[] | Stack[];
    penalty: number[] | Stack[];

    income: number[] | Stack[];

    effect_pool: number[] | Pool[];

}>

export type FieldList = {
    [key: string]: Field;
}
