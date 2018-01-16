import {
    MapPathList,
    GameMap,
    MapLocationList,
    BoardFieldList,
    Game,
    ResourceList,
    FactionList,
    ActivityList
} from './index';

export interface GameData {
    game?: Game;
    fields?: BoardFieldList;
    map?: GameMap;
    locations?: MapLocationList;
    paths?: MapPathList;
    resources?: ResourceList;
    factions?: FactionList;
    activities?: ActivityList;
}





