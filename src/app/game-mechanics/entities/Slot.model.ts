import { BaseModel, WithBoard, WithFrames, WithStyle } from "./Base.model";
import { Transition, RuntimeTransition } from "./Transition.model";
import { Shape } from "./Shape.model";
import { GameAction } from "./Action.model";
import { Condition } from "./Condition.model";
import { Choice } from "./Choice.model";
import { Token } from "./Token.model";
import { Stage } from "./Stage.model";
import { ImageFrame } from "./ImageAsset.model";
import { ParamedExpressionFunc } from "./Expression.model";
import { Style } from "./Style.model";
import { Omit } from "@app/shared";

export type Slot = BaseModel & WithBoard & WithFrames & WithStyle & Partial<{
    owner: number; // Stage;

    y: number;
    x: number;

    display_text: string; // Expression -> Text

    item: string;
    shape: number; // Shape

    handlers: SlotHandler[];
    transitions: Transition[];
}>;

export type RuntimeSlot = Omit<Slot, 'board' | 'frames' | 'style' | 'style_inline' | 'item' | 'shape' | 'handlers' | 'transitions'> & {
    board: Stage;
    frames: ImageFrame[];
    style: ParamedExpressionFunc;
    style_inline: Style;
    item: RuntimeSlotItem;
    shape: Shape;
    handlers: RuntimeSlotHandler[];
    transitions: RuntimeTransition[];
};

export type SlotHandler = {
    owner: number;

    type: HandlerType;
    effect: string; // Expression -> GameAction[]
    sound: string; // Expression -> Sonata
};

export type RuntimeSlotHandler = Omit<SlotHandler, 'effect' | 'sound'> & {
    effect: ParamedExpressionFunc;
    sound: ParamedExpressionFunc;
};

export type SlotItem = Partial<{
    action: GameAction;
    condition: Condition;
    choice: Choice;
    token: Token;
}>;

export type RuntimeSlotItem = Omit<SlotItem, 'action' | 'condition' | 'choice' | 'token'> & {
    action: GameAction;
    condition: Condition;
    choice: Choice;
    token: Token;
};

export const HANDLER_TYPES = {
    POINTERDOWN: 'POINTERDOWN',
    POINTERUP: 'POINTERUP',
    HOVERIN: 'HOVERIN',
    HOVEROUT: 'HOVEROUT',
};

export type HandlerType = keyof typeof HANDLER_TYPES;