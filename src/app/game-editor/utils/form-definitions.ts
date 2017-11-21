import {BaseControl} from '../../dynamic-forms/models/Base';
import {controlTypes} from '../../dynamic-forms/config/controlTypes';
import {Option} from '../../dynamic-forms/models/Base';
import {Resource} from '../../game-mechanics/models/Resource';

export function METADATA_DEF(movements: Option[]): BaseControl<any>[] {
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

export function FIELD_DEF(resources: Option[]): BaseControl<any>[] {
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
            required: false,
        }
    ];
}

export function CHARACTER_DEF(resources: Resource[] = [
    {
        name: 'Gold',
        id: 1
    }, {
        name: 'Wood',
        id: 2
    }
]): BaseControl<any>[] {
    return [
        {
            name: 'name',
            controlType: controlTypes.TEXT_INPUT,
            value: '',
            label: 'Pick character name',
            required: true
        }, {
            name: 'description',
            controlType: controlTypes.TEXT_INPUT,
            value: '',
            label: 'Character description',
            required: false
        }, {
            name: 'image',
            controlType: controlTypes.IMAGE_BROWSER,
            label: 'Choose character image',
            required: false
        }, {
            name: 'resources',
            controlType: controlTypes.QUANTITY_PICKER,
            label: 'Pick the character`s starting resources',
            required: false,
            childControls: resources.map((elem: Resource) => {
                const option: BaseControl<any> = {
                    label: elem.name,
                    name: elem.id.toString(),
                    controlType: controlTypes.SLIDER,
                    min: 0,
                    max: 100
                };
                return option;
            })
        }
    ];
}

export function RESOURCE_DEF(): BaseControl<any>[] {
    return [
        {
            name: 'name',
            controlType: controlTypes.TEXT_INPUT,
            value: '',
            label: 'Pick resource name',
            required: true
        }, {
            name: 'description',
            controlType: controlTypes.TEXT_INPUT,
            value: '',
            label: 'Resource description',
            required: false
        }, {
            name: 'image',
            controlType: controlTypes.IMAGE_BROWSER,
            label: 'Choose resource image',
            required: false
        }
    ];
}

export function GAME_LAUNCH_DEF(boardTypes: Option[]): BaseControl<any>[] {
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
