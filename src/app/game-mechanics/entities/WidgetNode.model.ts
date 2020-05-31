import { RzEventTypes, StatefulComponent } from "@app/render-kit";
import { Omit } from "@app/shared";

import { BaseModel, WithBoard, WithStyle } from "./Base.model";
import { Shape } from "./Shape.model";
import { RuntimeChoice } from "./Choice.model";
import { RuntimeToken } from "./Token.model";
import { Widget } from "./Widget.model";
import {
    ParamedExpressionFunc, EventHandlingExpressionFunc, LifecycleExpressionFunc, ContextSubscribingFunc,
    SonataGetterFunc
} from "./Expression.model";
import { Style } from "./Style.model";
import { Text } from "./Text.model";
import { Sonata } from "./Sonata.model";
import { Module } from "./Module.model";

// TODO: think about expression context and how to empower it. It should be a part of commonGameStore
// think about making nodes, lifecycles, handlers m2m again - it will provide easier testing and composing
// think about a Node hosting another lazy Module

export type WidgetNode = BaseModel & WithBoard & WithStyle & Partial<{
    owner: number; // Widget;

    y: number;
    x: number;

    display_text: string;
    display_text_inline: number;
    item: string;
    shape: number;
    module: number;

    provide_context: string;
    consume_context: string;

    pass_to_children: string;

    handlers: NodeHandler[];
    transitions: number[]; // TransitionId[]
    lifecycles: NodeLifecycle[];
}>;

export type RuntimeWidgetNode = Omit<WidgetNode, 'board' | 'style' | 'style_inline' | 'item' | 'shape' | 'display_text' | 'provide_context' | 'consume_context' | 'module'> & {

    item: RuntimeNodeItem;
    shape: Shape;
    board: Widget;
    module: Module;

    style: ParamedExpressionFunc<{ node: RuntimeWidgetNode, component: StatefulComponent }, Style>;
    style_inline: Style;

    display_text: ParamedExpressionFunc<{ node: RuntimeWidgetNode, component: StatefulComponent }, Text>;
    display_text_inline: Text;

    provide_context: ParamedExpressionFunc<{ node: RuntimeWidgetNode, component: StatefulComponent }, any>; // provideValueToSubscribers
    consume_context: ContextSubscribingFunc;

    pass_to_children: ParamedExpressionFunc<{ node: RuntimeWidgetNode, component: StatefulComponent }, any>;
};

export type NodeHandler = {
    owner: number;

    type: RzEventTypes;
    effect: string; // Expression
    sound: string; // Expression -> Sonata
    static_sound: number; // Sonata
};

export type RuntimeNodeHandler = Omit<NodeHandler, 'effect' | 'sound' | 'static_sound'> & {
    effect: EventHandlingExpressionFunc;
    sound: SonataGetterFunc;
    static_sound: Sonata;
};

export type NodeItem = Partial<{
    choice: number;
    token: number;
}>;

export type RuntimeNodeItem = Omit<NodeItem, 'choice' | 'token'> & Partial<{
    choice: RuntimeChoice;
    token: RuntimeToken;
}>;

export type NodeLifecycle = {
    owner: number;
    type: NODE_LIFECYCLES;

    effect: string;

    sound: string; // Expression -> Sonata
    static_sound: number; // Sonata
};

export type RuntimeNodeLifecycle = Omit<NodeLifecycle, 'effect' | 'sound' | 'static_sound'> & Partial<{
    effect: LifecycleExpressionFunc;

    sound: SonataGetterFunc;
    static_sound: Sonata;
}>;

export enum NODE_LIFECYCLES {
    'onUpdate' = 'onUpdate',
    'onMount' = 'onMount',
    'onUnmount' = 'onUnmount',
};