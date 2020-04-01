import { BaseModel, WithTemplate } from "./Base.model";
import { Omit } from "@app/shared";
import { Stage } from "./Stage.model";

export type Token = BaseModel & WithTemplate;

export type RuntimeToken = Omit<Token, 'template'> & {
  template: Stage;
}