import { GameAction } from "./Action.model"
import { BaseModel } from "./Base.model";
import { GenericEvent, StatefulComponent } from "@app/render-kit";

export type Expression = BaseModel & Partial<{
    code: string;
}>

export type ParamedExpressionFunc<T = {}, R = GameAction[]> = (payload: T) => R;

export type ExpressionFunc<T = GameAction[]> = () => T;

export type EventHandlingExpressionFunc<T = {}, R = GameAction[]> = (
    component: StatefulComponent,
    event: GenericEvent,
) => R;

