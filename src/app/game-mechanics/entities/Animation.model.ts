import { Style } from "./Style.model";

export type Animation = Partial<{
    id: number;
    game: number;

    name: string;
    description: string;

    type: AnimationPlayType;
    steps: AnimationStep[];
    repeat: number;
    bidirectional: number;
}>

export type AnimationStep = Partial<{
    id: number;
    owner: number;

    from_style: number | Style;
    to_style: number | Style;

    easing: string;
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

export const ANIMATION_EASING = {
    LINEAR: 'LINEAR',
};

export type AnimationEasing = keyof typeof ANIMATION_EASING;