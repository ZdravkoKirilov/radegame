import * as moveTypes from './moveTypes';
import { movement as basicMovement } from './basic';
import { Movement } from '../models/Movement';

interface MovementStyles {
    [key: string]: Movement
}

let movements: MovementStyles = {};
movements[moveTypes.BASIC] = basicMovement;

export default movements;
