import { movements, moveTypes } from './movements';
import { GameBoardTypes } from '../models/GameBoard';

export const GameBoards: GameBoardTypes = {
    'BasicGrid': {
        displayName: 'Basic Grid',
        allowedMovements: {
            [moveTypes.Basic]: movements.Basic
        }
    }
};
