import { BaseModel, WithTemplate, WithKeywords, } from "./Base.model";
import { Omit } from "@app/shared";
import { Stage } from "./Stage.model";

export type Choice = BaseModel & WithTemplate & Partial<{
    chances: string; // retries. Expression
    time: string; // Expression

    calculated_options: string; // Expression

    options: number[]; //ChoiceOption[];
    tips: number[]; // ChoiceTip[];
}>

export type ChoiceOption = Omit<BaseModel, 'game'> & WithKeywords & Partial<{
    owner: number; // Choice
    effect: string; // Expression
}>

export type ChoiceTip = WithKeywords & Partial<{
    owner: number; // Choice
    description: string;
    image: number; // ImageAsset
}>

export type RuntimeChoice = Omit<Choice, 'template'> & {
    template: Stage;
}