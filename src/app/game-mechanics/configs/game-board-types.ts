import { moveTypes } from './movements';
import { GameBoardTypes } from '../models/GameBoard';

export const GameBoards: GameBoardTypes = {
    'BasicGrid': {
        displayName: 'Basic Grid',
        id: 'BasicGrid',
        allowedMovements: [moveTypes.Basic, 'Other']
    },
    'TestBoard': {
        displayName: 'Test Board',
        id: 'TestBoard',
        allowedMovements: ['test1', 'test2']
    }
};
