import { Resource } from '../../../game-mechanics/models/index';
import { BaseControl } from '../../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../../dynamic-forms/config/controlTypes';

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
            toggleContext: {
                show: {
                    field: 'name',
                    value: ['Gosho']
                },
                defaultValue: '',
            }
        }, {
            name: 'image',
            controlType: controlTypes.IMAGE_PICKER,
            label: 'Resource image',
            required: false,
            value: data.image
        }
    ];
}
