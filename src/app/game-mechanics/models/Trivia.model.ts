import { Activity } from './index';

export const TRIVIA_MODES = {
    STATIC: 'Static'
};
export type TriviaModes = typeof TRIVIA_MODES.STATIC;

export interface Trivia {
    id?: number;
    game?: number;
    name?: string;
    description?: string;
    image?: string;
    mode?: TriviaModes;
    answers?: TriviaAnswer[];
}

export interface TriviaAnswer {
    id?: number;
    trivia?: number;
    image?: string;
    description?: string;
    result?: Activity[];
}

export interface TriviaList {
    [key: number]: Trivia;
}
