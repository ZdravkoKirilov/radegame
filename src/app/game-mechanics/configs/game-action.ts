import { ActionList, actionModes } from '../models/index';
import { systemActionTypes as res } from '../constants/system-action-types';

export const types = {
    GainResource: 'GainResource',
    ReduceResource: 'ReduceResource',
    StealResource: 'StealResource'
};

export const GameActions: ActionList = {
    [types.GainResource]: {
        id: types.GainResource,
        name: 'Gain Resource',
        mode: actionModes.TRIGGER,
        actions: [res.GAIN_RESOURCE]
    },
    [types.ReduceResource]: {
        id: types.ReduceResource,
        name: 'Reduce Resource',
        mode: actionModes.TRIGGER,
        actions: [res.REDUCE_RESOURCE]
    },
    [types.StealResource]: {
        id: types.StealResource,
        name: 'Steal Resource',
        mode: actionModes.TRIGGER,
        actions: [res.STEAL_RESOURCE]
    }
};

