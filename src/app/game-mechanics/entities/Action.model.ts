import { BaseModel, WithFrames, WithDisplayName } from "./Base.model";

export type GameAction = BaseModel & WithFrames & WithDisplayName & Partial<{
    configs: ActionConfig[];
}>

export type ActionConfig = Partial<{
    id: number;
    owner: number; // GameAction;

    type: ActionType;

    payload: ActionParam[];
}>

export type ActionParam = {
    key: string;
    value: any;
}

export type MutationParams = {
    path: string;
    value: any;
}

export const ACTION_TYPE = {
    END_TURN: 'END_TURN',
    MUTATE_STATE: 'MUTATE_STATE',
};

export type ActionType = keyof typeof ACTION_TYPE;



