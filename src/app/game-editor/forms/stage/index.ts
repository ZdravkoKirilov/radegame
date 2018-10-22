import { Stage } from '@app/game-mechanics';
import { BaseControl, controlTypes } from '@app/dynamic-forms';

export function STAGE_DEF(data: Stage = {}): BaseControl[] {
    data = data || {};
    return [
        {
            name: 'name',
            type: controlTypes.TEXT_INPUT,
            value: data.name,
            label: 'Stage name',
            required: true
        }, {
            name: 'description',
            type: controlTypes.TEXT_INPUT,
            value: data.description,
            label: 'Stage description',
            required: false
        },
    ];
}
