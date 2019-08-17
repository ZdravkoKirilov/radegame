import { BaseModel, } from "./Base.model";
import { Omit } from "@app/shared";

export type Choice = BaseModel & Partial<{
    random: boolean;  // could have a random choice option
    options: number[]; //ChoiceOption[];
}>

export type ChoiceOption = Omit<BaseModel, 'game'> & Partial<{
    owner: number; // Choice
    effect: number; // Expression
}>
