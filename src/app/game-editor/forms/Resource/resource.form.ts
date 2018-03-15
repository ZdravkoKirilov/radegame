import { Resource } from '../../../game-mechanics';
import { BaseControl, controlTypes } from '../../../dynamic-forms';

export function RESOURCE_DEF(data: Resource = {}): BaseControl[] {
    data = data || {};
    return [
        {
            name: 'name',
            controlType: controlTypes.TEXT_INPUT,
            value: data.name,
            label: 'Resource name',
            required: true
        }, {
            name: 'description',
            controlType: controlTypes.TEXT_INPUT,
            value: data.description,
            label: 'Resource description',
            required: false,
        }, {
            name: 'image',
            controlType: controlTypes.IMAGE_PICKER,
            label: 'Resource image',
            required: false,
            value: data.image
        }
    ];
}
