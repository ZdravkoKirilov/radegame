import { BaseModel, WithImage } from "./Base.model";

export type Stage = BaseModel & WithImage & Partial<{
    width: number;
    height: number;

    populate_by: number; // Expression // could return a dictionary with slot id as key and value as array
}>;






