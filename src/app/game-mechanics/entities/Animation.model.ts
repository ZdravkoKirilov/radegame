export type Animation = Partial<{
    id: number;
    game: number;

    name: string;
    description: string;

    from_style: number; // Style
    to_style: number; // Style

    for_props: string; // comma separated names, e.g.: width, x, color

    easing: EasingConfig;
    interpolation: string; // 89,555,244,999 etc.
}>



export const EASING_CONFIG = {
    LINEAR: 'LINEAR',
};

export type EasingConfig = keyof typeof EASING_CONFIG;