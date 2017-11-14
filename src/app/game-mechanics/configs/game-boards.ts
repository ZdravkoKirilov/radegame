import {moveTypes} from './movements';
import {types as abilities} from './abilities';
import {GameBoardTypes} from '../models/index';

export const types = {
    BASIC_GRID: 'BASIC_GRID',
    MAP: 'MAP'
};

export type boardTypes = 'BASIC_GRID' | 'MAP';

export const GameBoards: GameBoardTypes = {
    [types.BASIC_GRID]: {
        displayName: 'Basic Grid',
        id: types.BASIC_GRID,
        allowedMovements: [moveTypes.Basic, moveTypes.Other],
        supportedAbilities: [
            abilities.GainResource,
            abilities.ReduceResource,
            abilities.StealResource
        ]
    },
    [types.MAP]: {
        displayName: 'Territory MapState',
        id: types.MAP,
        allowedMovements: [moveTypes.Other],
        supportedAbilities: [
            abilities.GainResource,
            abilities.ReduceResource,
        ]
    }
};
