import { DEFAULT_MAP_LOCATION } from './config';
import { Field, LocationEntity } from '@app/game-mechanics';

export const composeDefaultLoc = (field: Field): LocationEntity => {
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
