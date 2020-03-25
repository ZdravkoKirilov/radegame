import { GameAction } from "./Action.model"
import { BaseModel } from "./Base.model";
import { GenericEvent, StatefulComponent } from "@app/render-kit";

export type Expression = BaseModel & Partial<{
    code: string;
}>

export type ParamedExpressionFunc<T = {}, R = GameAction[]> = (payload: T) => R;

export type ExpressionFunc<T = GameAction[]> = () => T;

export type EventHandlingExpressionFunc<ReturnData = GameAction[]> = (
    component: StatefulComponent,
    event: GenericEvent,
) => ReturnData;

