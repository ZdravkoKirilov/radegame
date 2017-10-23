import {BaseControl} from '../../dynamic-forms/models/Base';
import {controlTypes} from '../../dynamic-forms/config/controlTypes';
import { Option } from '../../dynamic-forms/models/Base';

export function GENERAL_SETTINGS(movements: Option[]): BaseControl<any>[] {
    return [
        {
            name: 'boardWidth',
            controlType: controlTypes.SLIDER,
            min: 4,
            max: 12,
            value: 4,
            step: 2,
            label: 'Pick board width'
        }, {
            name: 'boardHeight',
            controlType: controlTypes.SLIDER,
            min: 6,
            max: 20,
            value: 6,
            step: 2,
            label: 'Pick board height'
        }, {
            value: '',
            name: 'movements',
            controlType: controlTypes.BUTTON_GROUP,
            label: 'Pick movements',
            required: true,
            multiple: true,
            options: movements
        },
        {
            value: '',
            name: 'image',
            controlType: controlTypes.IMAGE_BROWSER,
            label: 'Browse or drag image here',
            required: true,
            errorMessage: 'Image is a required field.'
        }
    ];
}
