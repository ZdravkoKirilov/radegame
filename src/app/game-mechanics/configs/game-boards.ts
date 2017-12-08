import { moveTypes } from './movements';
import { types as actions } from '../systems/game-actions/statics';
import { GameBoardTypes } from '../models/index';

export const types = {
    BASIC_GRID: 'BASIC_GRID',
    MAP: 'MAP'
};

export const GameBoards: GameBoardTypes = {
    [types.BASIC_GRID]: {
        displayName: 'Basic Grid',
        id: types.BASIC_GRID,
        allowedMovements: [moveTypes.Basic, moveTypes.Other],
        supportedActions: [
            actions.GAIN_RESOURCE,
            actions.REDUCE_RESOURCE,
        ]
    },
    [types.MAP]: {
        displayName: 'Territory MapState',
        id: types.MAP,
        allowedMovements: [moveTypes.Other],
        supportedActions: [
            actions.GAIN_RESOURCE,
            actions.REDUCE_RESOURCE,
        ]
    }
};
