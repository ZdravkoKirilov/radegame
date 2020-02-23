import { BaseModel, WithBoard, WithStyle } from "./Base.model";
import { Transition, RuntimeTransition } from "./Transition.model";
import { Shape } from "./Shape.model";
import { GameAction } from "./Action.model";
import { Condition } from "./Condition.model";
import { Choice } from "./Choice.model";
import { Token } from "./Token.model";
import { Stage } from "./Stage.model";
import { ParamedExpressionFunc, EventHandlingExpressionFunc } from "./Expression.model";
import { Style } from "./Style.model";
import { Omit } from "@app/shared";
import { Text } from "./Text.model";
import { Sonata } from "./Sonata.model";

export type Slot = BaseModel & WithBoard & WithStyle & Partial<{
    owner: number; // Stage;

    y: number;
    x: number;

    display_text: string; // Expression -> Text
    display_text_inline: number;
    item: string;
    shape: number; // Shape

    handlers: SlotHandler[];
    transitions: Transition[];
}>;

export type RuntimeSlot = Omit<Slot, 'board' | 'style' | 'style_inline' | 'item' | 'shape' |
    'handlers' | 'transitions' | 'display_text'> & {
        board: Stage;
        style: ParamedExpressionFunc<RuntimeSlot, Style>;
        style_inline: Style;
        item: RuntimeSlotItem;
        shape: Shape;
        handlers: RuntimeSlotHandler[];
        transitions: RuntimeTransition[];
        display_text: ParamedExpressionFunc<RuntimeSlot, Text>;
        display_text_inline: Text;
    };

export type SlotHandler = {
    owner: number;

    type: HandlerType;
    effect: string; // Expression -> GameAction[]
    sound: string; // Expression -> Sonata
};

export type RuntimeSlotHandler = Omit<SlotHandler, 'effect' | 'sound'> & {
    effect: EventHandlingExpressionFunc;
    sound: ParamedExpressionFunc<RuntimeSlot, Sonata>;
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