import { BaseModel } from "./Base.model";

export type Phase = BaseModel;

export type PhaseList = {
    [key: string]: Phase;
}