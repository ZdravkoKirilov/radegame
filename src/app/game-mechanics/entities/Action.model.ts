import { BaseModel, WithCondition, WithKeywords } from "./Base.model";

export type GameAction = BaseModel & Partial<{
    configs: ActionConfig[];
}>

export type ActionConfig = Partial<{
    id: number;
    owner: number; // GameAction;

    type: ActionType;
    target: number; // Expression
    subject: number; // Expression

    auto_apply: boolean;

    value: string;
}>

export const ACTION_TYPE = {

    WIN_GAME: 'WIN_GAME',
    LOSE_GAME: 'LOSE_GAME',

    DRAW: 'DRAW', // source determined by TARGET AND SCOPE, amount by value, subject: which stage to populate, subject_scope - whose

    ALTER: 'ALTER', // which card - determined by TARGET and SCOPE; which keyword - determined by SUBJECT. Whether add or remove: amount -1 / +1

    PUT: 'PUT', // which field - determind by TARGET AND SCOPE, on what entity ( slot or path ) - determined by subject + subject_scope
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


