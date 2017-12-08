import {
    MapPathList,
    Map,
    MapLocationList,
    BoardFieldList,
    Game,
    ResourceList,
    MovementsList,
    FactionList
} from './index';

import { PrivateActionList } from '../systems/game-actions/statics';

export interface GameData {
    game?: Game;
    fields?: BoardFieldList;
    map?: Map;
    locations?: MapLocationList;
    paths?: MapPathList;
    resources?: ResourceList;
    factions?: FactionList;
    actions?: PrivateActionList;
    movements?: MovementsList;
    supportedActions?: string[];
    supportedMovements?: string[];
}
