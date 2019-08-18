import { BaseModel, WithFrames, WithDisplayName } from "./Base.model";

export type GameAction = BaseModel & WithFrames & WithDisplayName & Partial<{
    configs: ActionConfig[];
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

// alter keyword of field
// target: self.stages.find(stage => stage.id === 'base').fields
// subject: self.keywords.find(keyword => keyword.id ==='face-up')
// value = +1


// put fields on stage
// target: self.stages.find(stage => stage.id === 'hand').fields
// subject: self.stages.find(stage => stage.id === 'base').slots

// TODO - Stage mode: stacked hand ( to display it as a stacked hand of cards )


