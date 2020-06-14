import { RzEventTypes, StatefulComponent } from "@app/render-kit";
import { Omit, safeJSON } from "@app/shared";

import { BaseModel, WithBoard, WithStyle } from "./Base.model";
import { Shape } from "./Shape.model";
import { RuntimeChoice, Choice } from "./Choice.model";
import { RuntimeToken, Token } from "./Token.model";
import { Widget } from "./Widget.model";
import {
  ParamedExpressionFunc, EventHandlingExpressionFunc, LifecycleExpressionFunc, ContextSubscribingFunc,
  SonataGetterFunc
} from "./Expression.model";
import { Style } from "./Style.model";
import { Text } from "./Text.model";
import { Sonata } from "./Sonata.model";
import { Module } from "./Module.model";
import { enrichEntity, parseAndBind } from "../helpers";
import { ExpressionContext } from "../models";

export type WidgetNode = BaseModel & WithBoard & WithStyle & Partial<{
  owner: number; // Widget;

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

export const WidgetNode = {
  toRuntime(context: ExpressionContext, initialNode: WidgetNode) {
    const config = context.conf;
    const node = enrichEntity<WidgetNode, RuntimeWidgetNode>(config, {
      style: src => parseAndBind(context)(src),
      style_inline: value => safeJSON(value, null),
      item: (value: string) => safeJSON(value, null),
      shape: (shapeId: string) => enrichEntity(config, {
        style_inline: (src: string) => safeJSON(src, {})
      }, config.shapes[shapeId]),
      display_text: src => parseAndBind(context)(src),
      consume_context: src => parseAndBind(context)(src),
      provide_context: src => parseAndBind(context)(src),
      pass_to_children: src => parseAndBind(context)(src),
      display_text_inline: 'texts',
      board: 'widgets',
    }, initialNode);

    return node;
  }
}

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

export const NodeHandler = {
  toRuntime(context: ExpressionContext, handler: NodeHandler) {
    const config = context.conf;
    return enrichEntity<NodeHandler, RuntimeNodeHandler>(config, {
      effect: src => parseAndBind(context)(src),
      sound: src => parseAndBind(context)(src),
      static_sound: 'sonatas',
    }, handler);
  }
}

export type RuntimeNodeHandler = Omit<NodeHandler, 'effect' | 'sound' | 'static_sound'> & {
  effect: EventHandlingExpressionFunc;
  sound: SonataGetterFunc;
  static_sound: Sonata;
};

export type NodeItem = Partial<{
  choice: number;
  token: number;
}>;

export const NodeItem = {
  toRuntime(context: ExpressionContext, item: NodeItem) {
    const config = context.conf;
    return enrichEntity<NodeItem, RuntimeNodeItem>(config, {
      token: tokenId => Token.toRuntime(config, config.tokens[tokenId]),
      choice: choiceId => Choice.toRuntime(context, config.choices[choiceId]),
    }, item);
  }
}

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

export const NodeLifecycle = {
  toRuntime(context: ExpressionContext, lifecycle: NodeLifecycle) {
    return enrichEntity<NodeLifecycle, RuntimeNodeLifecycle>(context.conf, {
      effect: src => parseAndBind(context)(src),
      sound: src => parseAndBind(context)(src),
      static_sound: 'sonatas',
    }, lifecycle);
  }
}

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