import { WithKeywords } from "./Base.model";
import { GameLanguage } from "../models";

export type Text = WithKeywords & Partial<{
    id: number;
    game: number;

    name: string;
    default_value: string;
    translations: Translation[];
}>

export type Translation = Partial<{
    id: number;
    owner: number;

    language: number | GameLanguage;
    value: string;
}>