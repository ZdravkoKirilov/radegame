export interface GameAction {
    id?: number|string;
    name?: string;
    mode?: string;
    actions?: string[];
}

export interface ActionList {
    [key: string]: GameAction;
}

export const actionModes = {
    TRIGGER: 'TRIGGER',
    PASSIVE: 'PASSIVE'
};
