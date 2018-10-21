import { Round } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, controlTypes } from '@app/dynamic-forms';
import { composeConditionOptions, composeActionOptions } from '../helpers';

export function ROUND_DEF(data: Round, ent: ConnectedEntities): BaseControl[] {
    data = data || { activities: [], condition: [] };
    return [
        {
            name: 'name',
            type: controlTypes.TEXT_INPUT,
            value: data.name,
            label: 'Round name',
            required: true
        }, {
            name: 'description',
            type: controlTypes.TEXT_INPUT,
            value: data.description,
            label: 'Round description',
            required: false
        }, {
            name: 'image',
            type: controlTypes.IMAGE_PICKER,
            label: 'Round image',
            required: false,
            value: data.image
        }, {
            name: 'order',
            type: controlTypes.NUMBER_INPUT,
            label: 'Round order',
            value: data.order,
            required: false,
        }, {
            name: 'replay',
            type: controlTypes.NUMBER_INPUT,
            label: 'Allowed replays',
            value: data.replay,
            required: false,
        }, {
            name: 'condition',
            type: controlTypes.BUTTON_GROUP,
            multiple: true,
            showImage: true,
            label: 'Condition',
            value: data.condition.map(elem => elem.quest),
            options: composeConditionOptions(ent),
        }, {
            name: 'activities',
            type: controlTypes.BUTTON_GROUP,
            multiple: true,
            showImage: true,
            label: 'Activity pool',
            value: data.activities.map(elem => elem.activity),
            options: composeActionOptions(ent),
        },
    ];
}
