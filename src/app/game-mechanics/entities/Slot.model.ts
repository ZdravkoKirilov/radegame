import { BaseModel, WithBoard, WithStyle, WithState, WithFrames, WithImage } from "./Base.model";
import { Transition } from "./Transition.model";
import { Expression } from "./Expression.model";
import { Shape } from "./Shape.model";
import { GameAction } from "./Action.model";
import { Condition } from "./Condition.model";
import { Choice } from "./Choice.model";
import { Token } from "./Token.model";

export type Slot = BaseModel & WithBoard & WithStyle & WithImage & WithState & WithFrames & Partial<{
    owner: number; // Stage;

    y: number;
    x: number;

    display_text: Expression; // returns Text
    display_text_inline: string;

    item: SlotItem;
    shape: Shape; // Shape

    handlers: SlotHandler[];
    transitions: Transition[];
}>;

export type SlotHandler = {
    owner: number;

    type: HandlerType;

    effect: Expression;
    effect_inline: string;

    sound: Expression;
    sound_inline: string;
};

export type SlotItem = Partial<{
    action: GameAction;
    condition: Condition;
    choice: Choice;
    token: Token;
}>;

export const HANDLER_TYPES = {
    POINTERDOWN: 'POINTERDOWN',
    POINTERUP: 'POINTERUP',
    HOVERIN: 'HOVERIN',
    HOVEROUT: 'HOVEROUT',
};

export type HandlerType = keyof typeof HANDLER_TYPES;