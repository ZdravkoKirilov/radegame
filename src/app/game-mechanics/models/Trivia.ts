import {TriviaOption} from './TriviaOption';

export interface Trivia {
    id?: number;
    question?: string;
    choices?: {
        [key: string]: TriviaOption
    };
    answer?: TriviaOption;
    description?: string;
}

export interface TriviaList {
    items: { [key: string]: Trivia };
}
