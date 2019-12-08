import { Animation, RuntimeAnimation } from "./Animation.model";
import { Sound } from "./Sound.model";
import { ParamedExpressionFunc } from "./Expression.model";
import { Dictionary } from "@app/shared";
import { DidUpdatePayload } from "@app/render-kit";

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
    trigger: ParamedExpressionFunc<DidUpdatePayload, boolean>;
    enabled: ParamedExpressionFunc<Dictionary, boolean>;

    animation: RuntimeAnimation;
}