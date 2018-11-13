import { BaseModel, WithPermissions, WithCost, WithCondition, WithReveal, WithSettings, WithStakes } from "./Base.model";
import { Omit } from "@app/shared";

export type Choice = BaseModel & WithPermissions & WithCost & WithCondition &
    WithStakes & WithReveal & WithSettings & Partial<{
        mode: ChoiceMode;

        random: boolean;

        options: number[]; //ChoiceOption[];
    }>

// settings -> conditions with isTrue and isFalse to mark each answer as such, which allows the parent to have withStake
export type ChoiceOption = Omit<BaseModel, 'game'> & WithSettings & Partial<{
    owner: number; // Choice
    effect: number; // Source
}>

export type ChoiceMode = keyof typeof CHOICE_MODE;

export const CHOICE_MODE = {
    TRIGGER: 'TRIGGER',
    HYBRID: 'HYBRID',
    AUTO: 'AUTO',
};
