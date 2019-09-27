export type Transition = Partial<{
    id: number;
    game: number;

    trigger: string; // DSL style

    name: string;
    description: string;

    animation: number; // Animation
    sound: number; // Sound
}>