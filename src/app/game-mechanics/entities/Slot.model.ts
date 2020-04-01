import { BaseModel, WithBoard, WithStyle } from "./Base.model";
import { Shape } from "./Shape.model";
import { GameAction, RuntimeGameAction } from "./Action.model";
import { Condition, RuntimeCondition } from "./Condition.model";
import { Choice, RuntimeChoice } from "./Choice.model";
import { Token, RuntimeToken } from "./Token.model";
import { Stage } from "./Stage.model";
import { ParamedExpressionFunc, EventHandlingExpressionFunc } from "./Expression.model";
import { Style } from "./Style.model";
import { Omit } from "@app/shared";
import { Text } from "./Text.model";
import { Sonata } from "./Sonata.model";
import { RzEventTypes, StatefulComponent } from "@app/render-kit";

export type Slot = BaseModel & WithBoard & WithStyle & Partial<{
    owner: number; // Stage;

    y: number;
    x: number;

    display_text: string; // Expression -> Text
    display_text_inline: number;
    item: string;
    shape: number; // Shape

    handlers: SlotHandler[];
    transitions: number[]; // TransitionId[]
}>;

export type RuntimeSlot = Omit<Slot, 'board' | 'style' | 'style_inline' | 'item' | 'shape' | 'display_text'> & {
    board: Stage;
    style: ParamedExpressionFunc<{ slot: RuntimeSlot, component: StatefulComponent }, Style>;
    style_inline: Style;
    item: RuntimeSlotItem;
    shape: Shape;
    display_text: ParamedExpressionFunc<{ slot: RuntimeSlot, component: StatefulComponent }, Text>;
    display_text_inline: Text;
};

export type SlotHandler = {
    owner: number;

    type: RzEventTypes;
    effect: string; // Expression -> GameAction[]
    sound: string; // Expression -> Sonata
    static_sound: number; // Sonata
};

export type RuntimeSlotHandler = Omit<SlotHandler, 'effect' | 'sound' | 'static_sound'> & {
    effect: EventHandlingExpressionFunc;
    sound: ParamedExpressionFunc<StatefulComponent, Sonata>;
    static_sound: Sonata;
};

export type SlotItem = Partial<{
    action: number;
    condition: number;
    choice: number;
    token: number;
}>;

export type RuntimeSlotItem = Omit<SlotItem, 'action' | 'condition' | 'choice' | 'token'> & Partial<{
    action: RuntimeGameAction;
    condition: RuntimeCondition;
    choice: RuntimeChoice;
    token: RuntimeToken;
}>;