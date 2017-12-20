import { Resource } from '../../game-mechanics/models/Resource.model';
import { BoardField, FieldResource } from '../../game-mechanics/models/BoardField.model';
import { BaseControl } from '../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../dynamic-forms/config/controlTypes';

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