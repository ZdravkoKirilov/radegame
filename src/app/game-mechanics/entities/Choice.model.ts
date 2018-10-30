import { BaseModel } from "./Base.model";
import { Stack } from "./Stack.model";
import { Omit } from "@app/shared";

export type Choice = BaseModel & Partial<{
    mode: ChoiceMode;

    cost: number[] | Stack[];
    condition: Stack[] | number[];
    restricted: number[] | Stack[];
    allowed: number[] | Stack[];

    options: ChoiceOption[];
}>

export type ChoiceOption = Omit<BaseModel, 'game'> & Partial<{
    owner: Choice | number;
    effect: Stack[] | number[];
}>

export type ChoiceList = {
    [key: number]: Choice;
}

export type ChoiceMode = keyof typeof CHOICE_MODE;

export const CHOICE_MODE = {
    TRAP: 'TRAP',
    TRIGGER: 'TRIGGER',
    HYBRID: 'HYBRID',
    AUTO: 'AUTO',
};
