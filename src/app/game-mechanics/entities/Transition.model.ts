export type Transition = Partial<{
    id: number;
    game: number;

    name: string;
    description: string;

    trigger: string; // DSL style

    animation: number; // Animation
    sound: number; // Sound
}>