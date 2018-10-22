import { Resource } from '@app/game-mechanics';
import { BaseControl, controlTypes } from '@app/dynamic-forms';

export function RESOURCE_DEF(data: Resource = {}): BaseControl[] {
    data = data || {};
    return [
        {
            name: 'name',
            type: controlTypes.TEXT_INPUT,
            value: data.name,
            label: 'Resource name',
            required: true
        }, {
            name: 'description',
            type: controlTypes.TEXT_INPUT,
            value: data.description,
            label: 'Resource description',
        }, {
            name: 'keywords',
            type: controlTypes.TAGS_INPUT,
            label: 'Category',
            value: data.keywords,
            maxItems: 2
        }, {
            name: 'image',
            type: controlTypes.IMAGE_PICKER,
            label: 'Resource image',
            required: true,
            value: data.image
        }
    ];
}
