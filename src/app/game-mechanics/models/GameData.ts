import { MapPath, Map, MapLocation, BoardField, Game, Resource } from './index';

export interface GameData {
    game?: Game;
    fields?: BoardField[];
    map?: Map;
    locations?: MapLocation[];
    paths?: MapPath[];
    resources?: Resource[];
}
