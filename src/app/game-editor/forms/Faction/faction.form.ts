import { Faction, FactionResource, FACTION_TYPE } from '@app/game-mechanics';
import { BaseControl, controlTypes, ConnectedEntities } from '@app/dynamic-forms';
import { composeResourceOptions, composeEntityItem, composeFieldOptions, composeFromObject } from '../helpers';
import { composeQuotaTemplate } from '../shared';

export function FACTION_DEF(data: Faction, ent: ConnectedEntities): BaseControl[] {
    data = data || { resources: [], income: [] };

    const resOptions = composeResourceOptions(ent);
    const factionResource = <BaseControl>{
        type: controlTypes.FORM,
        children: [
            {
                name: 'id',
                type: controlTypes.TEXT_INPUT,
                hidden: true
            }, {
                name: 'resource',
                type: controlTypes.DROPDOWN,
                label: 'Resource',
                required: true,
                showImage: true,
                options: resOptions
            }, {
                name: 'amount',
                type: controlTypes.NUMBER_INPUT,
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
            type: controlTypes.TEXT_INPUT,
            label: 'Pick faction name',
            required: true,
            value: data.name || ''
        }, {
            name: 'type',
            type: controlTypes.DROPDOWN,
            value: data.type,
            label: 'Faction type',
            options: composeFromObject(FACTION_TYPE)
        }, {
            name: 'description',
            type: controlTypes.TEXT_INPUT,
            value: data.description,
            label: 'Faction description',
        }, {
            name: 'image',
            type: controlTypes.IMAGE_PICKER,
            label: 'Choose faction image',
            value: data.image,
            asBase64: true
        }, {
            name: 'keywords',
            type: controlTypes.TAGS_INPUT,
            label: 'Keywords',
            value: data.keywords
        }, {
            name: 'start',
            type: controlTypes.DROPDOWN,
            label: 'Starting position',
            value: data.start,
            options: composeFieldOptions(ent),
            showImage: true
        }, {
            name: 'resource_limit',
            type: controlTypes.NUMBER_INPUT,
            label: 'Resource limit',
            value: data.resource_limit
        }, {
            name: 'activity_limit',
            type: controlTypes.NUMBER_INPUT,
            label: 'Action limit',
            value: data.activity_limit
        }, {
            name: 'resources',
            type: controlTypes.GROUP,
            label: 'Faction starting resources',
            addButtonText: 'Add resource',
            children: existingResources,
            childTemplate: factionResource
        }, {
            name: 'income',
            type: controlTypes.GROUP,
            label: 'Faction income resources',
            addButtonText: 'Add income',
            children: existingIncome,
            childTemplate: factionResource
        }
    ];
}