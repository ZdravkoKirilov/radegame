import { RuntimeAnimation } from "./Animation.model";
import { ParamedExpressionFunc } from "./Expression.model";
import { DidUpdatePayload } from "@app/render-kit";
import { Sonata } from "./Sonata.model";
import { Dictionary, Omit } from "@app/shared";
import { BaseModel } from "./Base.model";

export type Transition = BaseModel & Partial<{
    trigger: string; // Expression -> boolean
    enabled: string; // Expression -> boolean
    animation: number;
    sound: string; // Expression
}>

export type RuntimeTransition = Omit<Transition, 'trigger' | 'enabled' | 'animation' | 'sound'> & {
    trigger: ParamedExpressionFunc<DidUpdatePayload, boolean>;
    enabled: ParamedExpressionFunc<DidUpdatePayload, boolean>;

    animation: RuntimeAnimation;
    sound: ParamedExpressionFunc<Dictionary, Sonata>;
}