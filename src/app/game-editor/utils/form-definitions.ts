import { BaseControl } from '../../dynamic-forms/models/Base';
import { controlTypes } from '../../dynamic-forms/config/controlTypes';
import { Option } from '../../dynamic-forms/models/Base';
import { Faction, Resource, BoardField, FieldResource, FactionResource } from '../../game-mechanics/models/index';

export type FormDefinition = (...args) => BaseControl[];

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

export function FIELD_DEF(resources: Resource[], existingData: BoardField): BaseControl[] {
    existingData = existingData || {income: [], cost: []};
    const resOptions = resources.map(elem => {
        return {
            label: elem.name,
            value: elem.id
        };
    });
    const income = existingData.income.map((elem: FieldResource): BaseControl => {
        return {
            controlType: controlTypes.NESTED_FORM,
            childControls: [
                {
                    name: 'resource',
                    controlType: controlTypes.DROPDOWN,
                    label: 'Resource',
                    required: true,
                    options: resOptions,
                    value: elem.resource
                }, {
                    name: 'quantity',
                    controlType: controlTypes.NUMBER_INPUT,
                    label: 'Quantity',
                    required: true,
                    value: elem.quantity
                }
            ]
        };
    });
    const cost = existingData.cost.map((elem: FieldResource): BaseControl => {
        return {
            controlType: controlTypes.NESTED_FORM,
            childControls: [
                {
                    name: 'resource',
                    controlType: controlTypes.DROPDOWN,
                    label: 'Resource',
                    required: true,
                    options: resOptions,
                    value: elem.resource
                }, {
                    name: 'quantity',
                    controlType: controlTypes.NUMBER_INPUT,
                    label: 'Quantity',
                    required: true,
                    value: elem.quantity
                }
            ]
        };
    });
    return [
        {
            name: 'name',
            controlType: controlTypes.TEXT_INPUT,
            value: existingData.name,
            label: 'Pick field name',
            required: true
        }, {
            name: 'description',
            controlType: controlTypes.TEXT_INPUT,
            value: existingData.description,
            label: 'Field description',
            required: false
        }, {
            name: 'image',
            controlType: controlTypes.IMAGE_BROWSER,
            label: 'Choose field image',
            required: false,
            value: existingData.image
        }, {
            name: 'income',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Pick income resources: ',
            addButtonText: 'Add new income resource',
            childControls: income,
            childTemplate: {
                controlType: controlTypes.NESTED_FORM,
                childControls: [
                    {
                        name: 'resource',
                        controlType: controlTypes.DROPDOWN,
                        label: 'Resource',
                        required: true,
                        options: resOptions
                    }, {
                        name: 'quantity',
                        controlType: controlTypes.NUMBER_INPUT,
                        label: 'Quantity',
                        required: true
                    }
                ]
            }
        }, {
            name: 'cost',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Pick field cost: ',
            addButtonText: 'Add new cost',
            childControls: cost,
            childTemplate: {
                controlType: controlTypes.NESTED_FORM,
                childControls: [
                    {
                        name: 'resource',
                        controlType: controlTypes.DROPDOWN,
                        label: 'Resource',
                        required: true,
                        options: resOptions
                    }, {
                        name: 'quantity',
                        controlType: controlTypes.NUMBER_INPUT,
                        label: 'Quantity',
                        required: true
                    }
                ]
            }
        }
    ];
}

export function FACTION_DEF(resources: Resource[], existingData: Faction = {}): BaseControl[] {

    const resOptions = resources.map(elem => {
        return {
            label: elem.name,
            value: elem.id
        };
    });
    const existingResources = existingData.resources.map((elem: FactionResource): BaseControl => {
        return {
            controlType: controlTypes.NESTED_FORM,
            childControls: [
                {
                    name: 'resource',
                    controlType: controlTypes.DROPDOWN,
                    label: 'Resource',
                    required: true,
                    options: resOptions,
                    value: elem.resource
                }, {
                    name: 'quantity',
                    controlType: controlTypes.NUMBER_INPUT,
                    label: 'Quantity',
                    required: true,
                    value: elem.quantity
                }
            ]
        };
    });


    return [
        {
            name: 'name',
            controlType: controlTypes.TEXT_INPUT,
            label: 'Pick faction name',
            required: true,
            value: existingData.name || ''
        }, {
            name: 'description',
            controlType: controlTypes.TEXT_INPUT,
            value: existingData.description,
            label: 'Faction description',
            required: false
        }, {
            name: 'image',
            controlType: controlTypes.IMAGE_BROWSER,
            label: 'Choose faction image',
            required: false,
            value: existingData.image
        }, {
            name: 'resources',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Pick the faction starting resources',
            addButtonText: 'Add item',
            childControls: existingResources,
            childTemplate: {
                controlType: controlTypes.NESTED_FORM,
                childControls: [
                    {
                        name: 'resource',
                        controlType: controlTypes.DROPDOWN,
                        label: 'Resource',
                        required: true,
                        options: resOptions
                    }, {
                        name: 'quantity',
                        controlType: controlTypes.NUMBER_INPUT,
                        label: 'Quantity',
                        required: true
                    }
                ]
            }
        }
    ];
}

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
