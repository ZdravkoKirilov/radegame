import { BaseControl } from '../../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../../dynamic-forms/config/controlTypes';
import { ActivityConfig } from '../../models/Activity.model';
import { actionModes } from './constants';
import { targetTypes } from './constants';

export const BASIC_ACTIVITY_DEF = (data: ActivityConfig = {}): BaseControl[] => {
    return [
        {
            name: 'amount',
            controlType: controlTypes.NUMBER_INPUT,
            value: data.amount,
            label: 'Bonus amount',
            required: true
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

export const AMOUNTABLE_ACTIVITY_DEF = (data: ActivityConfig = {}): BaseControl[] => {
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

export const PARAMLESS_ACTIVITY_DEF = (data: ActivityConfig = {}): BaseControl[] => {
    return [
        {
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

export const VARIABLE_PEOPLE_ACTIVITY_DEF = (data: ActivityConfig = {}): BaseControl[] => {
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

