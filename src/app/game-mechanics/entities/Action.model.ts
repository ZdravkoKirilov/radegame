import { BaseModel, WithTemplate } from "./Base.model";

export type GameAction = BaseModel & WithTemplate & Partial<{
    configs: ActionConfig[];
}>

export type ActionConfig = Partial<{
    id: number;
    owner: number; // GameAction;

    type: ActionType;

    payload: ActionParam;
}>

export type ActionParam = {
    key: string;
    value: any;
}

export const ACTION_TYPE = {
    END_TURN: 'END_TURN',
    MUTATE_STATE: 'MUTATE_STATE',

    LOAD_FROM_SERVER: 'LOAD_FROM_SERVER',
    SAVE_TO_SERVER: 'SAVE_TO_SERVER',
};

export type ActionType = keyof typeof ACTION_TYPE;



