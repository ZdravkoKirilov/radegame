import { Nominal } from "simplytyped";

import { Omit } from "@app/shared";

import { BaseModel, WithTemplate, WithFrames, WithTexts, WithModule } from "./Base.model";
import { Widget } from "./Widget.model";
import { GameTemplate } from "../models";
import { enrichEntity } from "../helpers";

export type TokenId = Nominal<string, 'TokenId'>;

export type Token = BaseModel<TokenId> & WithTemplate & WithFrames & WithTexts & WithModule;

export const Token = {
  toRuntime(config: GameTemplate, token: Token) {
    if (token) {
      return enrichEntity<Token, RuntimeToken>(config, {
        template: 'widgets',
      }, token);
    }
    return null;
  }
}

export type RuntimeToken = Omit<Token, 'template'> & {
  template: Widget;
}

// the template Widget will use those frames[] not only for displaying "front" and "back" but also
// may turn them into virtual "nodes" and place them somewhere on the card
// same goes for texts[]