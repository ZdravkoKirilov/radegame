import {MovementsList} from '../models/Movement';

export const moveTypes = {
    'Basic': 'BASIC',
    'Other': 'Other'
};

export const Movements: MovementsList = {
    [moveTypes.Basic]: {
        id: moveTypes.Basic,
        displayName: 'Basic Movement',
        description: ''
    },

    [moveTypes.Other]: {
        id: moveTypes.Other,
        displayName: 'Other Movement',
        description: ''
    }

};
