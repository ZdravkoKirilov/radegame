import {
    MapPathList,
    Map,
    MapLocationList,
    BoardFieldList,
    Game,
    ResourceList,
    ActionList,
    MovementsList,
    FactionList
} from './index';

export interface GameData {
    game?: Game;
    fields?: BoardFieldList;
    map?: Map;
    locations?: MapLocationList;
    paths?: MapPathList;
    resources?: ResourceList;
    factions?: FactionList;
    actions?: ActionList;
    movements?: MovementsList;
    supportedActions?: string[];
    supportedMovements?: string[];
}
