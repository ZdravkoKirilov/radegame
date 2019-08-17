import { WithState } from "./Base.model";

export type Handler = WithState & Partial<{
    id: number;
    game: number;

    name: string;
    description: string;

    type: HandlerType;

    effect: number; // Expression -> to filter out actions in runtime
}>

export const HANDLER_TYPES = {
    CLICK: 'CLICK',
    HOVER: 'HOVER',
};

export type HandlerType = keyof typeof HANDLER_TYPES;