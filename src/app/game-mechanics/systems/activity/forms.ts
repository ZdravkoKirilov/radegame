import { BaseControl } from '../../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../../dynamic-forms/config/controlTypes';

import { ActivityConfigParams } from './statics';

export const BASIC_ACTIVITY_DEF = (data: ActivityConfigParams = {}): BaseControl[] => {
    return [
        {
            name: 'bonus',
            controlType: controlTypes.NUMBER_INPUT,
            value: data.bonus,
            label: 'Bonus amount',
            required: true
        }
    ];
};

