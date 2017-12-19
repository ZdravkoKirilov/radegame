import { moveTypes } from './movements';
import { types as actions } from '../systems/activity/statics';
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
            actions.ATTACK_FIELD,
            actions.DEFEND_FIELD,
            actions.MINE_RESOURCES
        ]
    },
    [types.MAP]: {
        displayName: 'Territory MapState',
        id: types.MAP,
        allowedMovements: [moveTypes.Other],
        supportedActions: [
            actions.ATTACK_FIELD,
            actions.DEFEND_FIELD,
            actions.MINE_RESOURCES
        ]
    }
};
