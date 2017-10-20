import {moveTypes} from './movements';
import {types as abilities} from './abilities';
import {GameBoardTypes} from '../models/index';

export const GameBoards: GameBoardTypes = {
    'BasicGrid': {
        displayName: 'Basic Grid',
        id: 'BasicGrid',
        allowedMovements: [moveTypes.Basic, moveTypes.Other],
        supportedAbilities: [
            abilities.GainResource,
            abilities.ReduceResource,
            abilities.StealResource
        ]
    },
    'TestBoard': {
        displayName: 'Test Board',
        id: 'TestBoard',
        allowedMovements: [moveTypes.Other],
        supportedAbilities: [
            abilities.GainResource,
            abilities.ReduceResource,
        ]
    }
};
