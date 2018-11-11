import { BaseModel, WithPermissions, WithCost, WithCondition } from "./Base.model";
import { Omit } from "@app/shared";

export type Choice = BaseModel & WithPermissions & WithCost & WithCondition & Partial<{
    mode: ChoiceMode;

    options: number[]; //ChoiceOption[];
}>

export type ChoiceOption = Omit<BaseModel, 'game'> & Partial<{
    owner: number; // Choice
    effect: number; // Source
}>

export type ChoiceMode = keyof typeof CHOICE_MODE;

export const CHOICE_MODE = {
    TRAP: 'TRAP',
    TRIGGER: 'TRIGGER',
    HYBRID: 'HYBRID',
    AUTO: 'AUTO',
};
