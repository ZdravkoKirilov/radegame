export type Handler =  Partial<{
    id: number;
    game: number;

    name: string;
    description: string;

    type: HandlerType;

    state: number; // Expression. Will return an action to put the entity into a given state, e.g.: disabled/enabled
    actions: number; // Group

    effect: number; // Expression -> to filter out actions in runtime
}>

export const HANDLER_TYPES = {
    CLICK: 'CLICK',
    HOVER: 'HOVER',
};

export type HandlerType = keyof typeof HANDLER_TYPES;