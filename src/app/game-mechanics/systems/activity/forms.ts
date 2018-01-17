import { BaseControl, Option } from '../../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../../dynamic-forms/config/controlTypes';
import { ActivityConfig } from '../../models/Activity.model';
import { actionModes } from './constants';
import { targetTypes } from './constants';
import { ConnectedEntities } from '../../../dynamic-forms/models/ConnectedEntities';
import { Resource } from '../../models/index';

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

