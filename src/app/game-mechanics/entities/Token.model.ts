import { BaseModel, WithTemplate, WithFrames, WithTexts } from "./Base.model";
import { Omit } from "@app/shared";
import { Stage } from "./Stage.model";

export type Token = BaseModel & WithTemplate & WithFrames & WithTexts;

export type RuntimeToken = Omit<Token, 'template'> & {
  template: Stage;
}

// the template Stage will use those frames[] not only for displaying "front" and "back" but also
// may turn them into virtual "slots" and place them somewhere on the card
// same goes for texts[]