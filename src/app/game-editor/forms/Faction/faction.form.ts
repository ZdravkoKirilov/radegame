import { Faction, FactionResource } from '@app/game-mechanics';
import { BaseControl, controlTypes, ConnectedEntities } from '@app/dynamic-forms';
import { composeResourceOptions, composeEntityItem } from '../helpers';
import { composeQuotaTemplate } from '../shared';

export function FACTION_DEF(data: Faction, ent: ConnectedEntities): BaseControl[] {
    data = data || { resources: [], income: [], activities: [] };

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
                name: 'quantity',
                controlType: controlTypes.NUMBER_INPUT,
                label: 'Quantity',
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
            name: 'description',
            controlType: controlTypes.TEXT_INPUT,
            value: data.description,
            label: 'Faction description',
        }, {
            name: 'image',
            controlType: controlTypes.IMAGE_PICKER,
            label: 'Choose faction image',
            value: data.image
        }, {
            name: 'keywords',
            controlType: controlTypes.TAGS_INPUT,
            label: 'Keywords',
            value: data.keywords
        }, {
            name: 'activities',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Faction activities',
            addButtonText: 'Add action quota',
            childControls: data.activities.map(elem => composeEntityItem(elem, composeQuotaTemplate(ent, [ent.factions]))),
            childTemplate: composeQuotaTemplate(ent, [ent.factions])
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