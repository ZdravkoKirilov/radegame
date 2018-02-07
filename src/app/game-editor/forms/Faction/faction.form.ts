import { Faction, FactionResource } from '../../../game-mechanics/models/index';
import { BaseControl } from '../../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../../dynamic-forms/config/controlTypes';
import { ConnectedEntities } from '../../../dynamic-forms/models/ConnectedEntities';
import { composeResourceOptions } from '../helpers';

export function FACTION_DEF(data: Faction, ent: ConnectedEntities): BaseControl[] {
    data = data || {resources: [], income: []};

    const resOptions = composeResourceOptions(ent);
    const toNestedForm = (elem: FactionResource): BaseControl => {
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
    };
    const childTemplate = {
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
    };

    const existingResources = data.resources ? data.resources.map(toNestedForm) : [];
    const existingIncome = data.income ? data.income.map(toNestedForm) : [];

    return [
        {
            name: 'name',
            controlType: controlTypes.TEXT_INPUT,
            label: 'Pick faction name',
            required: true,
            value: data.name || ''
        }, {
            name: 'description',
            controlType: controlTypes.TEXT_INPUT,
            value: data.description,
            label: 'Faction description',
            required: false
        }, {
            name: 'image',
            controlType: controlTypes.IMAGE_BROWSER,
            label: 'Choose faction image',
            required: false,
            value: data.image
        }, {
            name: 'resources',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Pick the faction starting resources',
            addButtonText: 'Add resource',
            childControls: existingResources,
            childTemplate
        }, {
            name: 'income',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Pick the faction income resources',
            addButtonText: 'Add income',
            childControls: existingIncome,
            childTemplate
        }
    ];
}