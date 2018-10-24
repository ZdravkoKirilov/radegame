import { Faction, FACTION_TYPE } from '@app/game-mechanics';
import { BaseControl, controlTypes, ConnectedEntities } from '@app/dynamic-forms';
import { composeFromObject } from '../helpers';

export function FACTION_DEF(data: Faction, ent: ConnectedEntities): BaseControl[] {
    data = data || { };

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
        }
    ];
}