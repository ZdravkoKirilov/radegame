import { Activity } from './Activity.model';

export interface Question {
    id?: number;
    game?: number;
    name?: string;
    description?: string;
    image?: string;
    answers?: Answer[];
}

export interface Answer {
    id?: number;
    question?: number;
    image?: string;
    correct?: boolean;
    award?: Activity[];
    penalty?: Activity[];
}
