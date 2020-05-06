import { BaseModel, WithTemplate, WithFrames, WithTexts } from "./Base.model";
import { Omit } from "@app/shared";
import { Widget } from "./Widget.model";

export type Token = BaseModel & WithTemplate & WithFrames & WithTexts;

export type RuntimeToken = Omit<Token, 'template'> & {
  template: Widget;
}

// the template Widget will use those frames[] not only for displaying "front" and "back" but also
// may turn them into virtual "slots" and place them somewhere on the card
// same goes for texts[]