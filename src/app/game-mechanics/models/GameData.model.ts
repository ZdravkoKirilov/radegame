import {
    MapPathList,
    GameMap,
    MapLocationList,
    BoardFieldList,
    Game,
    ResourceList,
    MovementsList,
    FactionList
} from './index';

import { PrivateActivityList } from '../systems/activity/statics';

export interface GameData {
    game?: Game;
    fields?: BoardFieldList;
    map?: GameMap;
    locations?: MapLocationList;
    paths?: MapPathList;
    resources?: ResourceList;
    factions?: FactionList;
    activities?: PrivateActivityList;
    movements?: MovementsList;
    supportedActivities?: string[];
    supportedMovements?: string[];
}




