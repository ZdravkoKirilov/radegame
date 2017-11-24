import {moveTypes} from './movements';
import {types as actions} from './game-action';
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
        supportedActions: [
            actions.GainResource,
            actions.ReduceResource,
            actions.StealResource
        ]
    },
    [types.MAP]: {
        displayName: 'Territory MapState',
        id: types.MAP,
        allowedMovements: [moveTypes.Other],
        supportedActions: [
            actions.GainResource,
            actions.ReduceResource,
        ]
    }
};
