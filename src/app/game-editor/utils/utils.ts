import {DEFAULT_MAP_LOCATION} from './config';
import {BoardField, MapLocation} from '../../game-mechanics/models/index';

export const composeDefaultLoc = (fields: BoardField[], fieldId: number): MapLocation => {
    const field = fields.find(elem => elem.id === fieldId);
    return {
        ...DEFAULT_MAP_LOCATION,
        field: field.id,
        game: field.game
    };
};
