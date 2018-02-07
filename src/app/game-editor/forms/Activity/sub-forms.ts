import { BaseControl, Option, SubFormMapping } from '../../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../../dynamic-forms/config/controlTypes';
import { targetTypes} from '../../../game-mechanics/models/Activity.model';
import { ConnectedEntities } from '../../../dynamic-forms/models/ConnectedEntities';
import { Resource, ActivityConfig } from '../../../game-mechanics/models/index';
import { actionModes, types } from '../../../game-mechanics/models/Activity.model';

export const ActForm_WithBonus = (data: ActivityConfig = {}, ent: ConnectedEntities): BaseControl[] => {
    const resources: Option[] = ent.resources.map((elem: Resource): Option => ({label: elem.name, value: elem.id}));
    return [
        {
            name: 'amount',
            controlType: controlTypes.NUMBER_INPUT,
            value: data.amount,
            label: 'Bonus amount',
            required: true
        }, {
            name: 'resource',
            controlType: controlTypes.DROPDOWN,
            value: data.resource,
            required: true,
            label: 'Resource',
            options: resources
        }, {
            name: 'mode',
            controlType: controlTypes.DROPDOWN,
            options: [
                {
                    label: 'Trigger',
                    value: actionModes.TRIGGER
                }
            ],
            value: data.mode,
            label: 'Action mode',
            required: true
        }, {
            name: 'target',
            controlType: controlTypes.DROPDOWN,
            options: [
                {
                    label: 'Field',
                    value: targetTypes.FIELD
                }
            ],
            value: data.target,
            label: 'Action target',
            required: true
        }
    ];
};

export const ActForm_WithAmount = (data: ActivityConfig = {}): BaseControl[] => {
    return [
        {
            name: 'amount',
            controlType: controlTypes.NUMBER_INPUT,
            value: data.amount,
            label: 'Amount',
            required: true
        }, {
            name: 'mode',
            controlType: controlTypes.DROPDOWN,
            options: [
                {
                    label: 'Trigger',
                    value: actionModes.TRIGGER
                }, {
                    label: 'Trap',
                    value: actionModes.HIDDEN
                }, {
                    label: 'Passive',
                    value: actionModes.PASSIVE
                }
            ],
            value: data.mode,
            label: 'Action mode',
            required: true
        }, {
            name: 'target',
            controlType: controlTypes.DROPDOWN,
            options: [
                {
                    label: 'Player',
                    value: targetTypes.SELF
                }, {
                    label: 'Active Player',
                    value: targetTypes.ACTIVE_PLAYER
                }, {
                    label: 'Self',
                    value: targetTypes.SELF
                }, {
                    label: 'Other player',
                    value: targetTypes.OTHER_PLAYER
                }
            ],
            value: data.target,
            label: 'Action target',
            required: true
        }
    ];
};

export const ActForm_Amount_Resource = (data: ActivityConfig = {}, ent: ConnectedEntities): BaseControl[] => {
    const resources: Option[] = ent.resources.map((elem: Resource): Option => ({label: elem.name, value: elem.id}));
    return [
        {
            name: 'amount',
            controlType: controlTypes.NUMBER_INPUT,
            value: data.amount,
            label: 'Amount',
            required: true
        }, {
            name: 'resource',
            controlType: controlTypes.DROPDOWN,
            value: data.resource,
            required: true,
            label: 'Resource',
            options: resources
        }, {
            name: 'mode',
            controlType: controlTypes.DROPDOWN,
            options: [
                {
                    label: 'Trigger',
                    value: actionModes.TRIGGER
                }, {
                    label: 'Trap',
                    value: actionModes.HIDDEN
                }, {
                    label: 'Passive',
                    value: actionModes.PASSIVE
                }
            ],
            value: data.mode,
            label: 'Action mode',
            required: true
        }, {
            name: 'target',
            controlType: controlTypes.DROPDOWN,
            options: [
                {
                    label: 'Player',
                    value: targetTypes.PLAYER
                }, {
                    label: 'Active Player',
                    value: targetTypes.ACTIVE_PLAYER
                }, {
                    label: 'Self',
                    value: targetTypes.SELF
                }, {
                    label: 'Other player',
                    value: targetTypes.OTHER_PLAYER
                }
            ],
            value: data.target,
            label: 'Action target',
            required: true
        }
    ];
};

export const ActForm_Paramless = (data: ActivityConfig = {}): BaseControl[] => {
    return [
        {
            name: 'mode',
            controlType: controlTypes.DROPDOWN,
            options: [
                {
                    label: 'Trigger',
                    value: actionModes.TRIGGER
                }, {
                    label: 'Trap',
                    value: actionModes.HIDDEN
                }
            ],
            value: data.mode,
            label: 'Action mode',
            required: true
        }, {
            name: 'target',
            controlType: controlTypes.DROPDOWN,
            options: [
                {
                    label: 'Field',
                    value: targetTypes.FIELD
                }
            ],
            value: data.target,
            label: 'Action target',
            required: true
        }
    ];
};

export const ActForm_VarTargets = (data: ActivityConfig = {}): BaseControl[] => {
    return [
        {
            name: 'amount',
            controlType: controlTypes.NUMBER_INPUT,
            value: data.amount,
            label: 'Number of peeks',
            required: true
        }, {
            name: 'mode',
            controlType: controlTypes.DROPDOWN,
            options: [
                {
                    label: 'Trigger',
                    value: actionModes.TRIGGER
                }, {
                    label: 'Trap',
                    value: actionModes.HIDDEN
                }, {
                    label: 'Passive',
                    value: actionModes.PASSIVE
                }
            ],
            value: data.mode,
            label: 'Action mode',
            required: true
        }, {
            name: 'target',
            controlType: controlTypes.DROPDOWN,
            options: [
                {
                    label: 'Other player',
                    value: targetTypes.OTHER_PLAYER
                }, {
                    label: 'Active player',
                    value: targetTypes.ACTIVE_PLAYER
                }
            ],
            value: data.target,
            label: 'Action target',
            required: true
        }
    ];
};
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
        name: 'Cancel activity'
    }
};

