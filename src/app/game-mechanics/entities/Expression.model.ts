import { GameAction } from "./Action.model"
import { BaseModel } from "./Base.model";
import { GenericEvent, BasicComponent } from "@app/render-kit";

export type Expression = BaseModel & Partial<{
    code: string;
}>

export type ParamedExpressionFunc<T = {}, R = GameAction[]> = (payload: T) => R;

export type ExpressionFunc<T = GameAction[]> = () => T;

export type EventHandlingExpressionFunc<T = {}, R = GameAction[]> = (
    payload: T,
    event: GenericEvent,
    component: BasicComponent,
) => R;

