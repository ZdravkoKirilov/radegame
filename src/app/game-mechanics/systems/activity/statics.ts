import {
    BASIC_ACTIVITY_DEF,
    PARAMLESS_ACTIVITY_DEF,
    AMOUNTABLE_ACTIVITY_DEF,
    VARIABLE_PEOPLE_ACTIVITY_DEF
} from './forms';
import { types } from './constants';
import { SubFormMapping } from '../../../dynamic-forms/models/Base.model';

export const ACTIONS_MAPPING: SubFormMapping = {
    [types.ATTACK_FIELD]: {
        form: BASIC_ACTIVITY_DEF,
        name: 'Attack field'
    },
    [types.DEFEND_FIELD]: {
        form: BASIC_ACTIVITY_DEF,
        name: 'Defend field'
    },
    [types.MINE_RESOURCES]: {
        form: BASIC_ACTIVITY_DEF,
        name: 'Mine resources'
    },
    [types.ALTER_RESOURCE]: {
        form: AMOUNTABLE_ACTIVITY_DEF,
        name: 'Alter resource'
    },
    [types.STEAL_QUEST]: {
        form: AMOUNTABLE_ACTIVITY_DEF,
        name: 'Steal quest/s'
    },
    [types.DISCARD_QUEST]: {
        form: AMOUNTABLE_ACTIVITY_DEF,
        name: 'Discard quest/s'
    },
    [types.DRAW_QUEST]: {
        form: AMOUNTABLE_ACTIVITY_DEF,
        name: 'Draw quest/s'
    },
    [types.STEAL_ACTIVITY]: {
        form: AMOUNTABLE_ACTIVITY_DEF,
        name: 'Steal activity/s'
    },
    [types.DISCARD_ACTIVITY]: {
        form: AMOUNTABLE_ACTIVITY_DEF,
        name: 'Discard activity/s'
    },
    [types.PEEK_QUESTS]: {
        form: VARIABLE_PEOPLE_ACTIVITY_DEF,
        name: 'Peek at quests',
    },
    [types.PEEK_ACTIVITIES]: {
        form: VARIABLE_PEOPLE_ACTIVITY_DEF,
        name: 'Peek at actions'
    },
    [types.CANCEL_ATTACK_FIELD]: {
        form: PARAMLESS_ACTIVITY_DEF,
        name: 'Cancel attack'
    },
    [types.CANCEL_DEFEND_FIELD]: {
        form: PARAMLESS_ACTIVITY_DEF,
        name: 'Cancel defence'
    },
    [types.CANCEL_MINE_RESOURCE]: {
        form: PARAMLESS_ACTIVITY_DEF,
        name: 'Cancel mining'
    },
    [types.CANCEL_ACTIVITY]: {
        form: PARAMLESS_ACTIVITY_DEF,
        name: 'Cancel action'
    }
};
