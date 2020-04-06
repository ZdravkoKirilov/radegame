import { BaseModel } from "./Base.model";
import { GenericEvent, StatefulComponent } from "@app/render-kit";

export type Expression = BaseModel & Partial<{
    code: string;
}>

export type ParamedExpressionFunc<T = {}, ReturnType = any> = (payload: T) => ReturnType;

export type ExpressionFunc<ReturnType = any> = () => ReturnType;

export type EventHandlingExpressionFunc = (
    component: StatefulComponent,
    event: GenericEvent,
) => void;

