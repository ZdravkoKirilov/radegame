import { BaseControl } from '../../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../../dynamic-forms/config/controlTypes';
import { ActivityConfig} from '../../models/Activity.model';

export const BASIC_ACTIVITY_DEF = (data: ActivityConfig = {}): BaseControl[] => {
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

