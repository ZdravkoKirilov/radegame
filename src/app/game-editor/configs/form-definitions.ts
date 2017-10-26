import {BaseControl} from '../../dynamic-forms/models/Base';
import {controlTypes} from '../../dynamic-forms/config/controlTypes';
import {Option} from '../../dynamic-forms/models/Base';
import {promise} from 'selenium-webdriver';
import controlFlow = promise.controlFlow;

export function GENERAL_SETTINGS(movements: Option[]): BaseControl<any>[] {
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

export function FIELD_SETTINGS(resources: Option[]): BaseControl<any>[] {
    return [
        {
            name: 'name',
            controlType: controlTypes.TEXT_INPUT,
            value: '',
            label: 'Pick field name',
            required: true
        }, {
            name: 'description',
            controlType: controlTypes.TEXT_INPUT,
            value: '',
            label: 'Field description',
            required: false
        }, {
            name: 'image',
            controlType: controlTypes.IMAGE_BROWSER,
            label: 'Choose field image',
            required: false
        }
    ];
}
