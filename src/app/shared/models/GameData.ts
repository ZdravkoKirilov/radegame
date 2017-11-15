import { MapPath, Map, MapLocation, BoardField, Game } from '../../game-mechanics/models/index';

export interface GameData {
    game?: Game;
    fields?: BoardField[];
    map?: Map;
    locations?: MapLocation[];
    paths?: MapPath[];
}
