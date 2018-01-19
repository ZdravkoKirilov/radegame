import { ResourceList, FactionList, BoardFieldList, ActivityList, QuestList } from './index';

export interface GameTemplate {
    id?: number;
    resources?: ResourceList;
    factions?: FactionList;
    activities?: ActivityList;
    fields?: BoardFieldList;
    quests?: QuestList;
}

