import { RuntimeAnimation } from "./Animation.model";
import { ParamedExpressionFunc } from "./Expression.model";
import { AnimationPayload, AnimationPayloadSegment, StatefulComponent, RzStyles } from "@app/render-kit";
import { Sonata } from "./Sonata.model";
import { Dictionary, Omit } from "@app/shared";
import { BaseModel } from "./Base.model";

export type Transition = BaseModel & Partial<{
    trigger: string; // Expression -> boolean

    enabled: string; // Expression -> boolean

    animation: number;
    sound: string; // Expression

    onDone: string;
}>

export type RuntimeTransition = Omit<Transition, 'trigger' | 'enabled' | 'animation' | 'sound' | 'onDone'> & {
    trigger: ParamedExpressionFunc<AnimationPayload, boolean>;
    enabled: ParamedExpressionFunc<AnimationPayloadSegment, boolean>;

    animation: RuntimeAnimation;
    sound: ParamedExpressionFunc<Dictionary, Sonata>;

    onDone: ParamedExpressionFunc<{ component: StatefulComponent, transition: RuntimeTransition, styles?: RzStyles }, void>
}