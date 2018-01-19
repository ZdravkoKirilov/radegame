import { ActivityType } from '../systems/activity/constants';
import { ActivityMode, ActivityTarget } from '../systems/activity/constants';

export interface ActivityConfig {
    id?: number;
    type?: ActivityType;
    mode?: ActivityMode;
    target?: ActivityTarget;
    amount?: number;
    resource?: number;
}

export interface Activity {
    id?: number;
    game?: number;
    name?: string;
    description?: string;
    image?: string;
    cost?: ActivityCost[];
    configs?: ActivityConfig[];
}

export interface ActivityCost {
    id?: number;
    resource?: number;
    activity?: number;
    amount?: number;
}

export interface ActivityList {
    [key: string]: Activity;
}


