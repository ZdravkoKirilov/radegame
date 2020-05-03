import { BaseModel, WithBoard, WithStyle } from "./Base.model";
import { Shape } from "./Shape.model";
import { RuntimeChoice } from "./Choice.model";
import { RuntimeToken } from "./Token.model";
import { Stage, RuntimeStage } from "./Stage.model";
import { ParamedExpressionFunc, EventHandlingExpressionFunc, LifecycleExpressionFunc, ContextSubscribingFunc, SonataGetterFunc } from "./Expression.model";
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

    provide_context: string;
    consume_context: string;

    handlers: SlotHandler[];
    transitions: number[]; // TransitionId[]
    lifecycles: SlotLifecycle[];
}>;

export type RuntimeSlot = Omit<Slot, 'board' | 'style' | 'style_inline' | 'item' | 'shape' | 'display_text' | 'provide_context' | 'consume_context'> & {

    item: RuntimeSlotItem;
    shape: Shape;
    board: Stage;

    style: ParamedExpressionFunc<{ slot: RuntimeSlot, component: StatefulComponent }, Style>;
    style_inline: Style;

    display_text: ParamedExpressionFunc<{ slot: RuntimeSlot, component: StatefulComponent }, Text>;
    display_text_inline: Text;

    provide_context: ParamedExpressionFunc<{ slot: RuntimeSlot, component: StatefulComponent }, any>; // provideValueToSubscribers
    consume_context: ContextSubscribingFunc; // fires once, onMount: Returns string[] which are the names of contexts to which the component will subscribe which is a shortcut or it can return the Subscriptions[] directly as a lower level api. Return each subscription so it can be automatically unsubscribed on willUnmount
};

export type SlotHandler = {
    owner: number;

    type: RzEventTypes;
    effect: string; // Expression
    sound: string; // Expression -> Sonata
    static_sound: number; // Sonata
};

export type RuntimeSlotHandler = Omit<SlotHandler, 'effect' | 'sound' | 'static_sound'> & {
    effect: EventHandlingExpressionFunc;
    sound: SonataGetterFunc;
    static_sound: Sonata;
};

export type SlotItem = Partial<{
    choice: number;
    token: number;
}>;

export type RuntimeSlotItem = Omit<SlotItem, 'choice' | 'token'> & Partial<{
    choice: RuntimeChoice;
    token: RuntimeToken;
}>;

export type SlotLifecycle = {
    owner: number;
    type: SLOT_LIFECYCLES;

    effect: string;

    sound: string; // Expression -> Sonata
    static_sound: number; // Sonata
};

export type RuntimeSlotLifecycle = Omit<SlotLifecycle, 'effect' | 'sound' | 'static_sound'> & Partial<{
    effect: LifecycleExpressionFunc;

    sound: SonataGetterFunc;
    static_sound: Sonata;
}>;

export enum SLOT_LIFECYCLES {
    'onUpdate' = 'onUpdate',
    'onMount' = 'onMount',
    'onUnmount' = 'onUnmount',
};