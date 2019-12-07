import { Animation, RuntimeAnimation } from "./Animation.model";
import { Sound } from "./Sound.model";
import { ParamedExpressionFunc } from "./Expression.model";

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

export type RuntimeTransition = Transition & {
    trigger: ParamedExpressionFunc;
    enabled: ParamedExpressionFunc;

    animation: RuntimeAnimation;
}