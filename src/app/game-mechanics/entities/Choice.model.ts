import { Nominal, Omit } from 'simplytyped';

import { BaseModel, WithTemplate, WithKeywords, } from "./Base.model";
import { Widget } from "./Widget.model";
import { ExpressionContext } from "../models";
import { enrichEntity } from "../helpers";

export type ChoiceId = Nominal<string, 'ChoiceId'>;

export type Choice = BaseModel<ChoiceId> & WithTemplate & Partial<{
  chances: string; // retries. Expression
  time: string; // Expression

  calculated_options: string; // Expression

  options: number[]; //ChoiceOption[];
  tips: number[]; // ChoiceTip[];
}>;

export const Choice = {
  toRuntime(context: ExpressionContext, choice: Choice) {
    if (choice) {
      return enrichEntity<Choice, RuntimeChoice>(context.conf, {
        template: 'widgets',
      }, choice);
    }
    return null;
  }
}

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
  template: Widget;
}