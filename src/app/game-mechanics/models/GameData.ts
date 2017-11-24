import { MapPath, Map, MapLocation, BoardField, Game, Resource } from './index';
import { ActionList } from './GameAction';
import { MovementsList } from './Movement';

export interface GameData {
    game?: Game;
    fields?: BoardField[];
    map?: Map;
    locations?: MapLocation[];
    paths?: MapPath[];
    resources?: Resource[];
    actions?: ActionList;
    movements?: MovementsList;
    supportedActions?: string[];
    supportedMovements?: string[];
}
