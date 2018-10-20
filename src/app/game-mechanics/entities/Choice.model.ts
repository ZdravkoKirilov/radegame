export interface Choice {
    id?: number;
    game?: number;
    name?: string;
    description?: string;
    image?: string;
    answers?: ChoiceOption[];
}

export interface ChoiceOption {
    id?: number;
    trivia?: number;
    name?: string;
    image?: string;
    description?: string;
    effect?: TriviaAnswerEffect[];
}

export interface TriviaAnswerEffect {
    id?: number;
    activity?: number;
}

export interface ChoiceList {
    [key: number]: Choice;
}
