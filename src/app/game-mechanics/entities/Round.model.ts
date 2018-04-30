import { Quest } from './Quest.model';
import { Activity } from './Activity.model';

export interface Round {
    id?: number;
    game?: number;
    name?: string;
    description?: string;
    image?: string;
    order?: number;
    replay?: number;
    condition?: RoundCondition[];
    activities?: RoundActivity[];
}

export interface RoundCondition {
    id?: number;
    quest?: Quest;
}

export interface RoundActivity {
    id?: number;
    activity?: Activity;
}

export interface RoundList {
    [key: string]: Round;
}
