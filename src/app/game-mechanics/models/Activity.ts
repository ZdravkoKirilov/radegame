import { ActivityConfig } from '../systems/activity/statics';

export interface Activity {
    id?: number;
    game?: number;
    name?: string;
    description?: string;
    image?: string;
    card?: boolean;
    quota?: number;
    config?: ActivityConfig[];

}

export interface ActivityList {
    [key: string]: Activity;
}


