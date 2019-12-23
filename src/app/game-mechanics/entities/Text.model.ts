import { GameLanguage } from "../models";
import { BaseModel } from "./Base.model";

export type Text = BaseModel & Partial<{

    default_value: string;
    translations: Translation[];
}>

export type Translation = Partial<{
    id: number;
    owner: number;

    language: number | GameLanguage;
    value: string;
}>