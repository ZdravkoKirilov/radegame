import { Field } from "./Field.model";
import { Stage } from "./Stage.model";

export type LocationEntity =  Partial<{
    id: number;
    field: number | Field;
    game: number;
    stage: number | Stage;
    name: string;
    top: number;
    left: number;
    width: number;
    height: number;
}>

export type LocationEntityList = {
    [key: string]: LocationEntity;
}