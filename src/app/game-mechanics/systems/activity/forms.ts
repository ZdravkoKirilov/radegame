import { BaseControl } from '../../../dynamic-forms/models/Base';
import { controlTypes } from '../../../dynamic-forms/config/controlTypes';

import { ActivityConfigParams } from './statics';

export const ACTION_CONFIG_PARAMS_DEF = (data: ActivityConfigParams): BaseControl[] => {
    return [
        {
            name: 'bonus',
            controlType: controlTypes.NUMBER_INPUT,
            value: data.bonus,
            label: 'Pick bonus amount',
            required: true
        }
    ];
};

