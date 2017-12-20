import { Resource } from '../../game-mechanics/models/Resource.model';
import { BaseControl } from '../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../dynamic-forms/config/controlTypes';

export function RESOURCE_DEF(data: Resource = {}): BaseControl[] {
    return [
        {
            name: 'name',
            controlType: controlTypes.TEXT_INPUT,
            value: data.name,
            label: 'Pick resource name',
            required: true
        }, {
            name: 'description',
            controlType: controlTypes.TEXT_INPUT,
            value: data.description,
            label: 'Resource description',
            required: false
        }, {
            name: 'image',
            controlType: controlTypes.IMAGE_BROWSER,
            label: 'Choose resource image',
            required: false,
            value: data.image
        }
    ];
}