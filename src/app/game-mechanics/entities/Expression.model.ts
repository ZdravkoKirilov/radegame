import { GameAction } from "./Action.model"
import { BaseModel } from "./Base.model";

export type Expression = BaseModel & Partial<{
    code: string;
}>

export type ParamedExpressionFunc<T = {}, R = GameAction[]> = (payload: T) => R;

export type ExpressionFunc<T = GameAction[]> = () => T;

