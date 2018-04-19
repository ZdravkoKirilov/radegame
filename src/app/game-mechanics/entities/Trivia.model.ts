export interface Trivia {
    id?: number;
    game?: number;
    name?: string;
    description?: string;
    image?: string;
    answers?: TriviaAnswer[];
}

export interface TriviaAnswer {
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

export interface TriviaList {
    [key: number]: Trivia;
}
