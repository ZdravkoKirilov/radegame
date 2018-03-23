import { Quest, Activity } from './index';

export interface Round {
    id?: number;
    game?: number;
    name?: string;
    description?: string;
    image?: string;
    order?: number;
    replay?: number;
    condition?: RoundCondition[];
    quests?: RoundQuest[];
    activities?: RoundActivity[];
}

export interface RoundCondition {
    id?: number;
    quest?: Quest;
}

export interface RoundQuest {
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
