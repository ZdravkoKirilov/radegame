import { Resource } from '@app/game-mechanics';
import { BaseControl, controlTypes } from '@app/dynamic-forms';

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
        }, {
            name: 'keywords',
            controlType: controlTypes.TEXT_INPUT,
            label: 'Category',
            value: data.keywords
        }, {
            name: 'image',
            controlType: controlTypes.IMAGE_PICKER,
            label: 'Resource image',
            required: true,
            value: data.image
        }
    ];
}
