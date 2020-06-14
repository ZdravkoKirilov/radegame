import { Omit, Dictionary, safeJSON } from "@app/shared";
import { AnimationEasing, AnimationPayload } from "@app/render-kit";

import { Style } from "./Style.model";
import { ParamedExpressionFunc } from "./Expression.model";
import { WithKeywords } from "./Base.model";
import { ExpressionContext } from "../models";
import { enrichEntity, parseAndBind } from "../helpers";

export type Animation = WithKeywords & Partial<{
  id: number;
  game: number;

  name: string;
  description: string;

  type: AnimationPlayType;
  steps: AnimationStep[];

  repeat: number;
  bidirectional: boolean;
  delay: number;
}>

export const Animation = {
  toRuntime(context: ExpressionContext, animation: Animation) {
    const config = context.conf;

    return enrichEntity<Animation, RuntimeAnimation>(config, {
      steps: (step: AnimationStep) => enrichEntity<AnimationStep, RuntimeAnimationStep>(config, {
        from_style_inline: (src: string) => safeJSON(src, {}),
        to_style_inline: (src: string) => safeJSON(src, {}),
        from_value: (src: string) => parseAndBind(context)(src),
        to_value: (src: string) => parseAndBind(context)(src),
        output_transformer: src => parseAndBind(context)(src),
      }, step),
    }, animation);
  }
}

const AnimationStep = {
  toRuntime(context: ExpressionContext, step: AnimationStep) {
    const config = context.conf;

    return enrichEntity<AnimationStep, RuntimeAnimationStep>(config, {
      from_style_inline: (src: string) => safeJSON(src, {}),
      to_style_inline: (src: string) => safeJSON(src, {}),
      from_value: (src: string) => parseAndBind(context)(src),
      to_value: (src: string) => parseAndBind(context)(src),
      output_transformer: src => parseAndBind(context)(src),
    }, step);
  }
}

export type AnimationStep = Partial<{
  id: number;
  owner: number;

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
}>

export type RuntimeAnimation = Omit<Animation, 'steps'> & {
  steps: RuntimeAnimationStep[];
};

export type RuntimeAnimationStep = Omit<AnimationStep, 'from_value' | 'to_value' | 'from_style_inline' | 'to_style_inline' | 'output_transformer'> & Partial<{
  from_value: ParamedExpressionFunc<AnimationPayload, Dictionary>;
  to_value: ParamedExpressionFunc<AnimationPayload, Dictionary>;

  from_style_inline: Style;
  to_style_inline: Style;

  output_transformer: ParamedExpressionFunc<Dictionary, Dictionary>;
}>

export const ANIMATION_PLAY_TYPE = {
  SEQUENCE: 'SEQUENCE',
  PARALLEL: 'PARALLEL',
} as const;

export type AnimationPlayType = keyof typeof ANIMATION_PLAY_TYPE;