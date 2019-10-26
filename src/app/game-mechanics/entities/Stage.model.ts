import { BaseModel, WithImage } from "./Base.model";
import { ImageAsset } from "./ImageAsset.model";

export type Stage = BaseModel & Partial<{
    width: number;
    height: number;

    populate_by: number; // Expression // could return a dictionary with slot id as key and value as array

    image: number | ImageAsset;
}>;






