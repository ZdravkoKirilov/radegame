import { Nominal, Omit } from 'simplytyped';
import { omit } from 'lodash/fp';

import { Dictionary, safeJSON, Tagged } from "@app/shared";
import { AnimationEasing, AnimationPayload } from "@app/render-kit";

import { Style } from "./Style.model";
import { ParamedExpressionFunc } from "./Expression.model";
import { BaseModel, GameEntityParser } from "./Base.model";
import { enrichEntity, parseAndBind } from "../helpers";
import { toModuleId } from './Module.model';

export type AnimationId = Nominal<string, 'AnimationId'>;
const toAnimationId = (source: unknown) => String(source) as AnimationId;

export type Animation = Tagged<'Animation', BaseModel<AnimationId> & {

  type: AnimationPlayType;
  steps: AnimationStep[];

  repeat: number;
  bidirectional: boolean;
  delay: number;
}>;

export type DtoAnimation = Omit<Animation, '__tag' | 'type' | 'steps' | 'id' | 'module'> & {
  type: string;
  id: number;
  module: number;
  steps: DtoAnimationStep[];
};

export type RuntimeAnimation = Omit<Animation, 'steps'> & {
  steps: RuntimeAnimationStep[];
};

export const Animation: GameEntityParser<Animation, DtoAnimation, RuntimeAnimation> = {

  toRuntime(context, animation) {
    return enrichEntity<Animation, RuntimeAnimation>(context.conf, {
      steps: (step: AnimationStep) => AnimationStep.toRuntime(context, step),
    }, animation);
  },

  toDto(animation) {
    return {
      ...omit('__tag', animation),
      id: Number(animation.id),
      module: Number(animation.module),
      type: String(animation.type),
      steps: animation.steps.map(elem => AnimationStep.toDto(elem))
    };
  },

  toEntity(animationDto) {
    return {
      ...animationDto,
      __tag: 'Animation',
      id: toAnimationId(animationDto.id),
      module: toModuleId(animationDto.module),
      type: animationDto.type as AnimationPlayType,
      steps: animationDto.steps.map(elem => AnimationStep.toEntity(elem))
    };
  },
}

type AnimationStepId = Nominal<string, 'AnimationStepId'>;
const toAnimationStepId = (source: unknown) => String(source) as AnimationStepId;

export type AnimationStep = Tagged<'AnimationStep', {
  id: AnimationStepId;
  owner: AnimationId;

  name: string;

  from_value: string; // this is the place for dynamic styles as well, but also arbitrary values not part of RzStyle
  to_value: string;

  from_style_inline: string;
  to_style_inline: string;

  output_transformer: string;

  easing: AnimationEasing;
  delay: number;
  duration: number;

  repeat: number;
  bidirectional: boolean;
}>;

type DtoAnimationStep = Omit<AnimationStep, 'id' | 'owner' | '__tag'> & {
  id: number;
  owner: number;
}

export type RuntimeAnimationStep = Omit<AnimationStep, 'from_value' | 'to_value' | 'from_style_inline' | 'to_style_inline' | 'output_transformer'> & {
  from_value: ParamedExpressionFunc<AnimationPayload, Dictionary>;
  to_value: ParamedExpressionFunc<AnimationPayload, Dictionary>;

  from_style_inline: Style;
  to_style_inline: Style;

  output_transformer: ParamedExpressionFunc<Dictionary, Dictionary>;
}

const AnimationStep: GameEntityParser<AnimationStep, DtoAnimationStep, RuntimeAnimationStep> = {
  toRuntime(context, step) {

    return enrichEntity<AnimationStep, RuntimeAnimationStep>(context.conf, {
      from_style_inline: (src: string) => safeJSON(src, {}),
      to_style_inline: (src: string) => safeJSON(src, {}),
      from_value: (src: string) => parseAndBind(context)(src),
      to_value: (src: string) => parseAndBind(context)(src),
      output_transformer: src => parseAndBind(context)(src),
    }, step);
  },

  toDto(animationStep) {
    return {
      ...omit('__tag', animationStep),
      id: Number(animationStep.id),
      owner: Number(animationStep.owner),
    };
  },

  toEntity(dtoAnimationStep) {
    return {
      ...dtoAnimationStep,
      __tag: 'AnimationStep',
      id: toAnimationStepId(dtoAnimationStep.id),
      owner: toAnimationId(dtoAnimationStep.owner),
    };
  }

}

export const ANIMATION_PLAY_TYPE = {
  SEQUENCE: 'SEQUENCE',
  PARALLEL: 'PARALLEL',
} as const;

export type AnimationPlayType = keyof typeof ANIMATION_PLAY_TYPE;