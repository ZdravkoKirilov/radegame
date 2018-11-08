import { Field } from "./Field.model";
import { Stage } from "./Stage.model";
import { Token } from "./Token.model";
import { Stack } from "./Stack.model";
import { BaseModel } from "./Base.model";

export type LocationEntity = BaseModel & Partial<{
    owner: number | Stage;

    field: number | Field;
    tokens: number | Token[];

    restricted: number[] | Stack[];
    allowed: number[] | Stack[];

    y: number;
    x: number;
    width: number;
    height: number;
}>

export type LocationEntityList = {
    [key: string]: LocationEntity;
}