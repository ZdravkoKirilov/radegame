import { DEFAULT_MAP_LOCATION } from './config';
import { Field, MapLocation } from '../../game-mechanics';

export const composeDefaultLoc = (field: Field): MapLocation => {
    return {
        ...DEFAULT_MAP_LOCATION,
        field: field.id,
        game: field.game,
        stage: field.stage,
    };
};

export const prefixActionType = (prefix: string) => {
    return (actionType: string): string => {
        return `[${prefix}]_${actionType}`;
    };
}
