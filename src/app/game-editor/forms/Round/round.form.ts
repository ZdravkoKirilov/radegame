import { Round } from '../../../game-mechanics';
import { BaseControl, ConnectedEntities, controlTypes } from '../../../dynamic-forms';
import { composeQuestOptions, composeActivityOptions } from '../helpers';

export function ROUND_DEF(data: Round, ent: ConnectedEntities): BaseControl[] {
    data = data || {quests: [], activities: [], condition: []};
    return [
        {
            name: 'name',
            controlType: controlTypes.TEXT_INPUT,
            value: data.name,
            label: 'Round name',
            required: true
        }, {
            name: 'description',
            controlType: controlTypes.TEXT_INPUT,
            value: data.description,
            label: 'Round description',
            required: false
        }, {
            name: 'image',
            controlType: controlTypes.IMAGE_BROWSER,
            label: 'Round image',
            required: false,
            value: data.image
        }, {
            name: 'order',
            controlType: controlTypes.NUMBER_INPUT,
            label: 'Round order',
            value: data.order,
            required: false,
        }, {
            name: 'replay',
            controlType: controlTypes.NUMBER_INPUT,
            label: 'Allowed replays',
            value: data.replay,
            required: false,
        }, {
            name: 'condition',
            controlType: controlTypes.BUTTON_GROUP,
            multiple: true,
            label: 'Condition',
            value: data.condition.map(elem => elem.quest),
            options: composeQuestOptions(ent),
        }, {
            name: 'quests',
            controlType: controlTypes.BUTTON_GROUP,
            multiple: true,
            label: 'Quest pool',
            value: data.quests.map(elem => elem.quest),
            options: composeQuestOptions(ent),
        }, {
            name: 'activities',
            controlType: controlTypes.BUTTON_GROUP,
            multiple: true,
            label: 'Activity pool',
            value: data.activities.map(elem => elem.activity),
            options: composeActivityOptions(ent),
        },
    ];
}
