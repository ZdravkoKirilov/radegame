import { GameAction } from "./Action.model"

export type Expression = Partial<{
    id: number;
    game: number;

    name: string;
    description: string;

    code: string;
}>

export type ParamedExpressionFunc<T = {}, R = GameAction[]> = (payload: T) => R;

