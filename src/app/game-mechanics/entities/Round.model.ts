import { Condition } from './Condition.model';
import { GameAction } from './Action.model';
import { BaseModel } from './Base.model';

export type Round = BaseModel & Partial<{
    order: number;
    replay: number;
    condition: RoundCondition[];
    activities: RoundActivity[];
}>

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
