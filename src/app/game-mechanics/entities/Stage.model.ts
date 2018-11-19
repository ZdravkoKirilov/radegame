import { BaseModel } from "./Base.model";
import { Omit } from "@app/shared";

export type Stage = Omit<BaseModel, 'setups'> & Partial<{
    width: number;
    height: number;
}>;






