import { moveTypes } from './movements';
import { GameBoardTypes } from '../models/GameBoard';

export const GameBoards: GameBoardTypes = {
    'BasicGrid': {
        displayName: 'Basic Grid',
        id: 'BasicGrid',
        allowedMovements: [moveTypes.Basic]
    }
};
