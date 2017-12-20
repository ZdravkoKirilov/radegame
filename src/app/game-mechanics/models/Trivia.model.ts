export interface TriviaAnswer {
    id?: number | string;
    displayName?: string;
    content?: string;
}

export interface Trivia {
    id?: number;
    question?: string;
    choices?: TriviaAnswer[];
    answer?: TriviaAnswer;
    description?: string;
}

export interface TriviaList {
    items: { [key: string]: Trivia };
}
