import { Faction, FactionResource, FACTION_TYPE } from '@app/game-mechanics';
import { BaseControl, controlTypes, ConnectedEntities } from '@app/dynamic-forms';
import { composeResourceOptions, composeEntityItem, composeFieldOptions, composeFromObject } from '../helpers';
import { composeQuotaTemplate } from '../shared';

export function FACTION_DEF(data: Faction, ent: ConnectedEntities): BaseControl[] {
    data = data || { resources: [], income: [] };

    const resOptions = composeResourceOptions(ent);
    const factionResource = <BaseControl>{
        controlType: controlTypes.NESTED_FORM,
        childControls: [
            {
                name: 'id',
                controlType: controlTypes.TEXT_INPUT,
                hidden: true
            }, {
                name: 'resource',
                controlType: controlTypes.DROPDOWN,
                label: 'Resource',
                required: true,
                showImage: true,
                options: resOptions
            }, {
                name: 'amount',
                controlType: controlTypes.NUMBER_INPUT,
                label: 'Amount',
                required: true
            }
        ]
    };


    const existingResources = data.resources ? data.resources.map(elem => composeEntityItem(elem, factionResource)) : [];
    const existingIncome = data.income ? data.income.map(elem => composeEntityItem(elem, factionResource)) : [];

    return [
        {
            name: 'name',
            controlType: controlTypes.TEXT_INPUT,
            label: 'Pick faction name',
            required: true,
            value: data.name || ''
        }, {
            name: 'type',
            controlType: controlTypes.DROPDOWN,
            value: data.type,
            label: 'Faction type',
            options: composeFromObject(FACTION_TYPE)
        }, {
            name: 'description',
            controlType: controlTypes.TEXT_INPUT,
            value: data.description,
            label: 'Faction description',
        }, {
            name: 'image',
            controlType: controlTypes.IMAGE_PICKER,
            label: 'Choose faction image',
            value: data.image,
            asBase64: true
        }, {
            name: 'keywords',
            controlType: controlTypes.TAGS_INPUT,
            label: 'Keywords',
            value: data.keywords
        }, {
            name: 'start',
            controlType: controlTypes.DROPDOWN,
            label: 'Starting position',
            value: data.start,
            options: composeFieldOptions(ent),
            showImage: true
        }, {
            name: 'resource_limit',
            controlType: controlTypes.NUMBER_INPUT,
            label: 'Resource limit',
            value: data.resource_limit
        }, {
            name: 'activity_limit',
            controlType: controlTypes.NUMBER_INPUT,
            label: 'Action limit',
            value: data.activity_limit
        }, {
            name: 'resources',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Faction starting resources',
            addButtonText: 'Add resource',
            childControls: existingResources,
            childTemplate: factionResource
        }, {
            name: 'income',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Faction income resources',
            addButtonText: 'Add income',
            childControls: existingIncome,
            childTemplate: factionResource
        }
    ];
}