import { BaseModel, WithKeywords, WithFrames, WithImage, WithDisplayName, } from "./Base.model";
import { Omit } from "@app/shared";

export type Choice = BaseModel & WithKeywords & WithFrames & WithImage & WithDisplayName & Partial<{
    chances: number; // retries. Expression
    time: number; // Expression

    options_filter: number; // Expression
    scope: number; // Expression

    options: number[]; //ChoiceOption[];
    tips: number[]; // ChoiceTip[];
}>

export type ChoiceOption = Omit<BaseModel, 'game'> & WithKeywords & Partial<{
    owner: number; // Choice
    effect: number; // Expression
}>

export type ChoiceTip = WithKeywords & Partial<{
    owner: number; // Choice
    description: string;
    image: number; // ImageAsset
}>