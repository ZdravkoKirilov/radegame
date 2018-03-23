import { Stage } from '../../../game-mechanics';
import { BaseControl, controlTypes } from '../../../dynamic-forms';

export function STAGE_DEF(data: Stage = {}): BaseControl[] {
    data = data || {};
    return [
        {
            name: 'name',
            controlType: controlTypes.TEXT_INPUT,
            value: data.name,
            label: 'Stage name',
            required: true
        }, {
            name: 'description',
            controlType: controlTypes.TEXT_INPUT,
            value: data.description,
            label: 'Stage description',
            required: false
        },
    ];
}
