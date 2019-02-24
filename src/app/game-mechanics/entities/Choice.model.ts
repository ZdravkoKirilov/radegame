import { BaseModel, WithPermissions, WithCost, WithReveal, WithSettings, WithStakes } from "./Base.model";
import { Omit } from "@app/shared";

export type Choice = BaseModel & WithPermissions & WithCost &
    WithStakes & WithReveal & WithSettings & Partial<{
        mode: ChoiceMode;
        random: boolean;
        options: number[]; //ChoiceOption[];
    }>

// settings -> conditions with isTrue and isFalse to mark each answer as such, which allows the parent to have withStake
export type ChoiceOption = Omit<BaseModel, 'game'> & WithSettings & Partial<{
    owner: number; // Choice
    effect: number[]; // Source[]
    value: string; // in combination with "random" for dice mechanic
    secret: boolean;
}>

export type ChoiceMode = keyof typeof CHOICE_MODE;

export const CHOICE_MODE = {
    TRIGGER: 'TRIGGER',
    AUTO: 'AUTO',
};
