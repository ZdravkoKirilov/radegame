import { ActionConfig } from '../systems/game-actions/statics';

export interface GameAction {
    id?: number;
    name?: string;
    description?: string;
    image?: string;
    card?: boolean;
    quota?: number;
    actions?: ActionConfig[]; // filtered by mode/target
}


export interface ActionList {
    [key: string]: GameAction;
}

