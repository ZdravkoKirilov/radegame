import {AbilityList, abilityModes} from '../models/Ability';
import {resourceActionTypes as res} from '../constants/system-action-types';

export const types = {
    GainResource: 'GainResource',
    ReduceResource: 'ReduceResource',
    StealResource: 'StealResource'
};

export const Abilities: AbilityList = {
    [types.GainResource]: {
        name: 'Gain Resource',
        mode: abilityModes.TRIGGER,
        actions: [res.GAIN_RESOURCE]
    },
    [types.ReduceResource]: {
        name: 'Reduce Resource',
        mode: abilityModes.TRIGGER,
        actions: [res.REDUCE_RESOURCE]
    },
    [types.StealResource]: {
        name: 'Steal Resource',
        mode: abilityModes.TRIGGER,
        actions: [res.STEAL_RESOURCE]
    }
};

