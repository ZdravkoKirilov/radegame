import { BaseModel, WithFrames, WithDisplayName } from "./Base.model";

export type GameAction = BaseModel & WithFrames & WithDisplayName & Partial<{
    configs: ActionConfig[];
    payload: {
        [key: string]: any;
    }
}>

export type ActionConfig = Partial<{
    id: number;
    owner: number; // GameAction;

    type: ActionType;

    target: number; // Expression
    subject: number; // Expression
    value: number; // Expression
}>

export const ACTION_TYPE = {

    END_TURN: 'END_TURN',

    WIN_GAME: 'WIN_GAME',

    ACTIVATE_CHOICE: 'ACTIVATE_CHOICE',
    SHOW_CHOICE_UI: 'SHOW_CHOICE_UI',

    ACTIVATE_CONDITION: 'ACTIVATE_CONDITION',
    CLOSE_CONDITION: 'CLOSE_CONDITION',

    TAKE_FROM_SLOT: 'TAKE_FROM_SLOT',
    PUT_ON_SLOT: 'PUT_ON_SLOT',

    ADD_KEYWORD: 'ADD_KEYWORD',
    REMOVE_KEYWORD: 'REMOVE_KEYWORD',

};

export type ActionType = keyof typeof ACTION_TYPE;



