import { Nominal } from 'simplytyped';

import { Dictionary, Omit } from "@app/shared";
import { AnimationPayload, AnimationPayloadSegment, StatefulComponent, RzStyles } from "@app/render-kit";

import { RuntimeAnimation, Animation } from "./Animation.model";
import { ParamedExpressionFunc } from "./Expression.model";
import { Sonata } from "./Sonata.model";
import { BaseModel } from "./Base.model";
import { ExpressionContext } from "../models";
import { enrichEntity, parseAndBind } from "../helpers";

export type TransitionId = Nominal<string, 'TransitionId'>;

export type Transition = BaseModel<TransitionId> & Partial<{
  trigger: string; // Expression -> boolean

  enabled: string; // Expression -> boolean

  animation: number;
  sound: string; // Expression

  onDone: string;
}>

export const Transition = {
  toRuntime(context: ExpressionContext, transition: Transition) {
    const config = context.conf;
    return enrichEntity<Transition, RuntimeTransition>(config, {
      animation: animationId => Animation.toRuntime(context, config.animations[animationId] as Animation),
      trigger: src => parseAndBind(context)(src)
    }, transition);
  }
}

export type RuntimeTransition = Omit<Transition, 'trigger' | 'enabled' | 'animation' | 'sound' | 'onDone'> & {
  trigger: ParamedExpressionFunc<AnimationPayload, boolean>;
  enabled: ParamedExpressionFunc<AnimationPayloadSegment, boolean>;

  animation: RuntimeAnimation;
  sound: ParamedExpressionFunc<Dictionary, Sonata>;

  onDone: ParamedExpressionFunc<{ component: StatefulComponent, transition: RuntimeTransition, styles?: RzStyles }, void>
}