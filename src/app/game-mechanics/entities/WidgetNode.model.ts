import { Omit, Nominal } from 'simplytyped';

import { RzEventTypes, StatefulComponent } from "@app/render-kit";
import { safeJSON } from "@app/shared";

import { BaseModel, WithBoard, WithStyle } from "./Base.model";
import { Shape, ShapeId } from "./Shape.model";
import { Token, TokenId } from "./Token.model";
import { Widget, WidgetId } from "./Widget.model";
import {
  ParamedExpressionFunc, EventHandlingExpressionFunc, LifecycleExpressionFunc, ContextSubscribingFunc,
  SonataGetterFunc
} from "./Expression.model";
import { Style } from "./Style.model";
import { Text } from "./Text.model";
import { Sonata } from "./Sonata.model";
import { Module, ModuleId } from "./Module.model";
import { enrichEntity, parseAndBind } from "../helpers";
import { ExpressionContext } from "../models";

export type WidgetNodeId = Nominal<string, 'WidgetNodeId'>;

export type WidgetNode = BaseModel<WidgetNodeId> & WithBoard & WithStyle & Partial<{
  owner: WidgetId;

  display_text: string;
  display_text_inline: number;

  token: TokenId;
  shape: ShapeId;
  module: ModuleId;

  provide_context: string;
  consume_context: string;

  pass_to_children: string;

  handlers: NodeHandler[];
  lifecycles: NodeLifecycle[];
}>;

export const WidgetNode = {
  toRuntime(context: ExpressionContext, initialNode: WidgetNode) {
    const config = context.conf;
    const node = enrichEntity<WidgetNode, RuntimeWidgetNode>(config, {
      style: src => parseAndBind(context)(src),
      style_inline: value => safeJSON(value, null),
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

export type RuntimeWidgetNode = Omit<WidgetNode, 'board' | 'style' | 'style_inline' | 'token' | 'shape' | 'display_text' | 'provide_context' | 'consume_context' | 'module'> & {

  token: Token;
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

export type NodeHandlerId = Nominal<string, "NodeHandlerId">;

export type NodeHandler = {
  id: NodeHandlerId;
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
}

export type NodeLifecycleId = Nominal<string, "NodeLifecycleId">;

export type NodeLifecycle = {
  id: NodeLifecycleId;
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