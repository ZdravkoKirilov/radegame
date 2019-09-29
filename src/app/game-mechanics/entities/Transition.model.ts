import { Animation } from "./Animation.model";
import { Sound } from "./Sound.model";
import { Expression } from "./Expression.model";

export type Transition = Partial<{
    id: number;
    game: number;

    name: string;
    description: string;

    trigger: string; // DSL style
    prop: string; // the trigger watches this prop
    enabled: number | Expression;

    animation: number | Animation;
    sound: number | Sound;
}>