import { MapPath, Map, MapLocation, BoardFieldList, Game, Resource } from './index';
import { ActionList } from './GameAction';
import { MovementsList } from './Movement';

export interface GameData {
    game?: Game;
    fields?: BoardFieldList;
    map?: Map;
    locations?: MapLocation[];
    paths?: MapPath[];
    resources?: Resource[];
    actions?: ActionList;
    movements?: MovementsList;
    supportedActions?: string[];
    supportedMovements?: string[];
}
