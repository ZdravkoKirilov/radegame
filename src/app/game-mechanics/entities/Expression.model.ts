import { GameAction } from "./Action.model"

export type Expression = Partial<{
    id: number;
    game: number;

    name: string;
    description: string;

    preload_as: string;
    code: string;
    parsed_code: Function;
}>

export type SimpleExpressionFunc = () => GameAction[];
export type ParamedExpressionFunc<T> = (payload: T) => GameAction[];
export type CurriedExpressionFunc<T> = () => ParamedExpressionFunc<T>;

