import { Activity } from './index';

export const TRIVIA_MODES = {
    STATIC: 'Static',
    OPEN: 'Open',
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
    name?: string;
    image?: string;
    description?: string;
    effect?: Activity[];
}

export interface TriviaList {
    [key: number]: Trivia;
}
