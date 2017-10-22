import { AbilityList, abilityModes } from '../models/Ability';
import { systemActionTypes as res } from '../constants/system-action-types';

export const types = {
    GainResource: 'GainResource',
    ReduceResource: 'ReduceResource',
    StealResource: 'StealResource'
};

export const Abilities: AbilityList = {
    [types.GainResource]: {
        id: types.GainResource,
        name: 'Gain Resource',
        mode: abilityModes.TRIGGER,
        actions: [res.GAIN_RESOURCE]
    },
    [types.ReduceResource]: {
        id: types.ReduceResource,
        name: 'Reduce Resource',
        mode: abilityModes.TRIGGER,
        actions: [res.REDUCE_RESOURCE]
    },
    [types.StealResource]: {
        id: types.StealResource,
        name: 'Steal Resource',
        mode: abilityModes.TRIGGER,
        actions: [res.STEAL_RESOURCE]
    }
};

