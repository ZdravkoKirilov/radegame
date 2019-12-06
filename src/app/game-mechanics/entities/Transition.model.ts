import { Animation } from "./Animation.model";
import { Sound } from "./Sound.model";

export type Transition = Partial<{
    id: number;
    game: number;

    name: string;
    description: string;

    trigger: string; // Expression -> boolean

    enabled: string; // Expression -> boolean

    animation: Animation;

    sound: Sound;
}>