import { Omit, Nominal } from 'simplytyped';

import { GenericEvent, StatefulComponent, DidUpdatePayload } from "@app/render-kit";
import { GenericSubscription } from "@app/shared";

import { BaseModel, WithModule } from "./Base.model";
import { Sonata } from "./Sonata.model";
import { RuntimeWidgetNode } from "./WidgetNode.model";

export type ExpressionId = Nominal<string, 'ExpressionId'>;

export type Expression = BaseModel<ExpressionId> & WithModule & Partial<{
    code: string;
}>

export type RuntimeExpression<T = ParamedExpressionFunc> = Omit<Expression, 'code'> & Partial<{
    code: T;
}>;

export type ParamedExpressionFunc<T = {}, ReturnType = any> = (payload: T) => ReturnType;

export type ExpressionFunc<ReturnType = any> = () => ReturnType;

export type EventHandlingExpressionFunc<T = any> = (
    component: StatefulComponent,
    event: GenericEvent,
) => T | T[];

export type LifecycleExpressionFunc<T = any> = (
    component: StatefulComponent,
    payload?: DidUpdatePayload,
) => T | T[];

export type ContextSubscribingFunc = ParamedExpressionFunc<{
    node: RuntimeWidgetNode,
    component: StatefulComponent
}, GenericSubscription[] | string[]>

export type SonataGetterFunc = ParamedExpressionFunc<StatefulComponent, Sonata>;
