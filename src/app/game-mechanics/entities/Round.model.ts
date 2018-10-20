import { Condition } from './Condition.model';
import { GameAction } from './Action.model';

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
    quest?: Condition;
}

export interface RoundActivity {
    id?: number;
    activity?: GameAction;
}

export interface RoundList {
    [key: string]: Round;
}
