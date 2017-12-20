import { BaseControl, Option } from '../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../dynamic-forms/config/controlTypes';

export function METADATA_DEF(movements: Option[]): BaseControl[] {
    return [{
        name: 'description',
        controlType: controlTypes.TEXT_INPUT,
        label: 'Game description'
    }, {
        value: '',
        name: 'image',
        controlType: controlTypes.IMAGE_BROWSER,
        label: 'Browse or drag image here',
        required: true,
        errorMessage: 'Image is a required field.'
    }, {
        value: '',
        name: 'movements',
        controlType: controlTypes.BUTTON_GROUP,
        label: 'Pick movements',
        required: true,
        multiple: true,
        options: movements
    }
    ];
}

export function GAME_LAUNCH_DEF(boardTypes: Option[]): BaseControl[] {
    return [
        {
            name: 'title',
            controlType: controlTypes.TEXT_INPUT,
            value: '',
            label: 'Pick game title',
            required: true
        }, {
            name: 'boardType',
            controlType: controlTypes.BUTTON_GROUP,
            label: 'Pick board type',
            required: true,
            options: boardTypes
        }
    ];
}
