import { BaseModel, WithBoard, WithState, WithFrames, WithImage, WithStyle } from "./Base.model";
import { Transition } from "./Transition.model";
import { Shape } from "./Shape.model";
import { GameAction } from "./Action.model";
import { Condition } from "./Condition.model";
import { Choice } from "./Choice.model";
import { Token } from "./Token.model";
import { Style } from "./Style.model";

export type Slot = BaseModel & WithBoard & WithImage & WithState & WithFrames & WithStyle & Partial<{
    owner: number; // Stage;

    y: number;
    x: number;

    display_text: string; // Expression -> Text

    item: SlotItem;
    shape: Shape; // Shape

    handlers: SlotHandler[];
    transitions: Transition[];
}>;

export type SlotHandler = {
    owner: number;

    type: HandlerType;

    effect: string; // Expression -> GameAction[]

    sound: string; // Expression -> Sonata
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