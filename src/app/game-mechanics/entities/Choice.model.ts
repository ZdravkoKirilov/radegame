import { BaseModel, } from "./Base.model";
import { Omit } from "@app/shared";

export type Choice = BaseModel & Partial<{
    random: boolean;  // could have a random choice option
    secret: boolean; // hide all options
    options: number[]; //ChoiceOption[];
}>

// settings -> conditions with isTrue and isFalse to mark each answer as such, which allows the parent to have withStake
export type ChoiceOption = Omit<BaseModel, 'game'> & Partial<{
    owner: number; // Choice
    effect: number; // Group
    value: string; // in combination with "random" for dice mechanic
    secret: boolean;
}>
