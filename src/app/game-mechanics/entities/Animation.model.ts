export type Animation = Partial<{
    id: number;
    game: number;

    name: string;
    description: string;

    from_style: number; // Style
    to_style: number; // Style
}>



export const EASING_CONFIG = {
    LINEAR: 'LINEAR',
};

export type EasingConfig = keyof typeof EASING_CONFIG;