import { DEFAULT_MAP_LOCATION } from './config';
import { BoardField, MapLocation } from '../../game-mechanics/models/index';

export const composeDefaultLoc = (field: BoardField): MapLocation => {
    return {
        ...DEFAULT_MAP_LOCATION,
        field: field.id,
        game: field.game
    };
};
