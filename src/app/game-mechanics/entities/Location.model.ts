import { Field } from "./Field.model";
import { Stage } from "./Stage.model";
import { Token } from "./Token.model";
import { Stack } from "./Stack.model";

export type LocationEntity =  Partial<{
    id: number;
    game: number;
    owner: number | Stage;

    field: number | Field;
    token: number | Token;

    restricted: number[] | Stack[];
    allowed: number[] | Stack[];

    top: number;
    left: number;
    width: number;
    height: number;
}>

export type LocationEntityList = {
    [key: string]: LocationEntity;
}