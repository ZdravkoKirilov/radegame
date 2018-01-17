import {
    ActForm_WithBonus,
    ActForm_Paramless,
    ActForm_WithAmount,
    ActForm_VarTargets,
    ActForm_Amount_Resource
} from './forms';
import { types } from './constants';
import { SubFormMapping } from '../../../dynamic-forms/models/Base.model';

export const ACTIONS_MAPPING: SubFormMapping = {
    [types.ATTACK_FIELD]: {
        form: ActForm_WithBonus,
        name: 'Attack field'
    },
    [types.DEFEND_FIELD]: {
        form: ActForm_WithBonus,
        name: 'Defend field'
    },
    [types.MINE_RESOURCES]: {
        form: ActForm_WithBonus,
        name: 'Mine resources'
    },
    [types.ALTER_RESOURCE]: {
        form: ActForm_Amount_Resource,
        name: 'Alter resource'
    },
    [types.STEAL_QUEST]: {
        form: ActForm_WithAmount,
        name: 'Steal quest/s'
    },
    [types.DISCARD_QUEST]: {
        form: ActForm_WithAmount,
        name: 'Discard quest/s'
    },
    [types.DRAW_QUEST]: {
        form: ActForm_WithAmount,
        name: 'Draw quest/s'
    },
    [types.STEAL_ACTIVITY]: {
        form: ActForm_WithAmount,
        name: 'Steal activity/s'
    },
    [types.DISCARD_ACTIVITY]: {
        form: ActForm_WithAmount,
        name: 'Discard activity/s'
    },
    [types.PEEK_QUESTS]: {
        form: ActForm_VarTargets,
        name: 'Peek at quests',
    },
    [types.PEEK_ACTIVITIES]: {
        form: ActForm_VarTargets,
        name: 'Peek at actions'
    },
    [types.CANCEL_ATTACK_FIELD]: {
        form: ActForm_Paramless,
        name: 'Cancel attack'
    },
    [types.CANCEL_DEFEND_FIELD]: {
        form: ActForm_Paramless,
        name: 'Cancel defence'
    },
    [types.CANCEL_MINE_RESOURCE]: {
        form: ActForm_Paramless,
        name: 'Cancel mining'
    },
    [types.CANCEL_ACTIVITY]: {
        form: ActForm_Paramless,
        name: 'Cancel action'
    }
};
