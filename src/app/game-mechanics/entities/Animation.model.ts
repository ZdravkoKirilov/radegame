import { Style } from "./Style.model";
import { AnimationEasing } from "@app/render-kit";

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

    from_style: number | Style;
    to_style: number | Style;

    from_style_inline: Style;
    to_style_inline: Style;

    easing: AnimationEasing;
    delay: number;
    duration: number;

    repeat: number;
    bidirectional: boolean;
}>

export const ANIMATION_PLAY_TYPE = {
    SEQUENCE: 'SEQUENCE',
    PARALLEL: 'PARALLEL',
} as const;

export type AnimationPlayType = keyof typeof ANIMATION_PLAY_TYPE;