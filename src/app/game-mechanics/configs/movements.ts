import { movement as basicMovement } from '../movement/basic';
import { MovementsList } from '../models/Movement';

export const moveTypes = {
    'Basic': 'BASIC'
};

export const movements: MovementsList = {
    [moveTypes.Basic]: basicMovement
};
