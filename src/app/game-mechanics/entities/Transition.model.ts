import { Animation, RuntimeAnimation } from "./Animation.model";
import { ParamedExpressionFunc } from "./Expression.model";
import { DidUpdatePayload } from "@app/render-kit";
import { Sonata } from "./Sonata.model";
import { Dictionary } from "@app/shared";

export type Transition = Partial<{
    id: number;
    game: number;

    name: string;
    description: string;

    trigger: string; // Expression -> boolean

    enabled: string; // Expression -> boolean

    animation: Animation;

    sound: string;
}>

export type RuntimeTransition = Transition & {
    trigger: ParamedExpressionFunc<DidUpdatePayload, boolean>;
    enabled: ParamedExpressionFunc<DidUpdatePayload, boolean>;

    animation: RuntimeAnimation;
    sound: ParamedExpressionFunc<Dictionary, Sonata>;
}