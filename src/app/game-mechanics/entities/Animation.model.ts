import { Style } from "./Style.model";
import { AnimationEasing, DidUpdatePayload } from "@app/render-kit";
import { ParamedExpressionFunc } from "./Expression.model";
import { Omit, Dictionary } from "@app/shared";
import { WithKeywords } from "./Base.model";

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

export type AnimationStep = Partial<{
    id: number;
    owner: number;

    from_value: string;
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
    from_value: ParamedExpressionFunc<DidUpdatePayload, Dictionary>;
    to_value: ParamedExpressionFunc<DidUpdatePayload, Dictionary>;

    from_style_inline: Style;
    to_style_inline: Style;

    output_transformer: ParamedExpressionFunc<Dictionary, Dictionary>;
}>

export const ANIMATION_PLAY_TYPE = {
    SEQUENCE: 'SEQUENCE',
    PARALLEL: 'PARALLEL',
} as const;

export type AnimationPlayType = keyof typeof ANIMATION_PLAY_TYPE;