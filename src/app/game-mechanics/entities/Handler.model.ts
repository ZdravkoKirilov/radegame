import { WithState } from "./Base.model";
import { Expression } from "./Expression.model";
import { Sonata } from "./Sonata.model";

export type Handler = WithState & Partial<{
    id: number;
    game: number;

    name: string;
    description: string;

    type: HandlerType;

    effect: number | Expression; // Expression -> to filter out actions in runtime
    sound: number | Expression;
    enabled: number | Expression; // Expression
}>

export const HANDLER_TYPES = {
    POINTERDOWN: 'POINTERDOWN',
    POINTERUP: 'POINTERUP',
    HOVERIN: 'HOVERIN',
    HOVEROUT: 'HOVEROUT',
};

export type HandlerType = keyof typeof HANDLER_TYPES;