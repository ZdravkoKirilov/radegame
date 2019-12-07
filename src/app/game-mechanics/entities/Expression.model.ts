import { GameAction } from "./Action.model"

export type Expression = Partial<{
    id: number;
    game: number;

    name: string;
    description: string;

    code: string;
}>

export type SimpleExpressionFunc = () => GameAction[];
export type ParamedExpressionFunc<T = {}> = (payload: T) => GameAction[];
export type CurriedExpressionFunc<T> = () => ParamedExpressionFunc<T>;

