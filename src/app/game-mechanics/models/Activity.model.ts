import { ActivityMode, ActivityType, ActivityTarget } from '../systems/activity/statics';

export interface ActivityConfig {
    id?: number;
    type?: ActivityType;
    mode?: ActivityMode;
    target?: ActivityTarget;
    bonus?: number;
}

export interface Activity {
    id?: number;
    game?: number;
    name?: string;
    description?: string;
    image?: string;
    configs?: ActivityConfig[];
}

export interface ActivityList {
    [key: string]: Activity;
}


