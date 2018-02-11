import { ResourceList, FactionList, FieldList, ActivityList, QuestList } from './index';

export interface GameTemplate {
    id?: number;
    resources?: ResourceList;
    factions?: FactionList;
    activities?: ActivityList;
    fields?: FieldList;
    quests?: QuestList;
}

