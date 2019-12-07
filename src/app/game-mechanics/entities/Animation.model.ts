import { Style } from "./Style.model";
import { AnimationEasing } from "@app/render-kit";
import { ParamedExpressionFunc } from "./Expression.model";
import { Omit } from "@app/shared";

export type Animation = Partial<{
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

export type AnimationStep = Partial<{
    id: number;
    owner: number;

    from_style: string;
    to_style: string;

    from_style_inline: string;
    to_style_inline: string;

    easing: AnimationEasing;
    delay: number;
    duration: number;

    repeat: number;
    bidirectional: boolean;
}>

export type RuntimeAnimation = Omit<Animation, 'steps'> & {
    steps: RuntimeAnimationStep[];
};

export type RuntimeAnimationStep = Omit<AnimationStep, 'from_style' | 'to_style' | 'from_style_inline' | 'to_style_inline'> & Partial<{
    from_style: ParamedExpressionFunc;
    to_style: ParamedExpressionFunc;

    from_style_inline: Style;
    to_style_inline: Style;
}>

export const ANIMATION_PLAY_TYPE = {
    SEQUENCE: 'SEQUENCE',
    PARALLEL: 'PARALLEL',
} as const;

export type AnimationPlayType = keyof typeof ANIMATION_PLAY_TYPE;