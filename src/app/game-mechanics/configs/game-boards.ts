import { GameBoardTypes } from '../models/index';

export const types = {
    BASIC_GRID: 'BASIC_GRID',
    MAP: 'MAP'
};

export const GameBoards: GameBoardTypes = {
    [types.BASIC_GRID]: {
        displayName: 'Basic Grid',
        id: types.BASIC_GRID,
    },
    [types.MAP]: {
        displayName: 'Territory MapState',
        id: types.MAP,
    }
};
