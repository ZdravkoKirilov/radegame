import { Resource } from '../../game-mechanics/models/Resource';
import { BaseControl } from '../../dynamic-forms/models/Base';
import { controlTypes } from '../../dynamic-forms/config/controlTypes';

export function GAME_ACTION_DEF(data: Resource = {}): BaseControl[] {
    return [
        {
            name: 'name',
            controlType: controlTypes.TEXT_INPUT,
            value: data.name,
            label: 'Pick game action name',
            required: true
        }, {
            name: 'description',
            controlType: controlTypes.TEXT_INPUT,
            value: data.description,
            label: 'Game action description',
            required: false
        },
    ];
}
