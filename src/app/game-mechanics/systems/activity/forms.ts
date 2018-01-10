import { BaseControl } from '../../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../../dynamic-forms/config/controlTypes';
import { ActivityConfig } from '../../models/Activity.model';
import { actionModes } from './constants';
import { targetTypes } from './constants';

export const BASIC_ACTIVITY_DEF = (data: ActivityConfig = {}): BaseControl[] => {
    return [
        {
            name: 'bonus',
            controlType: controlTypes.NUMBER_INPUT,
            value: data.bonus,
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

