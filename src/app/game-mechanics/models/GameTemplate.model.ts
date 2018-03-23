import {
    ResourceList, FactionList, FieldList, ActivityList,
    QuestList, StageList, RoundList, MapLocationList,
    MapPathList, TriviaList
} from '../entities';

export interface GameTemplate {
    id?: number;
    resources?: ResourceList;
    factions?: FactionList;
    activities?: ActivityList;
    fields?: FieldList;
    quests?: QuestList;
    rounds?: RoundList;
    stages?: StageList;
    locations?: MapLocationList;
    paths?: MapPathList;
    trivia?: TriviaList;
}


