import { BaseControl, Option } from '../../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../../dynamic-forms/config/controlTypes';
import { Activity, ActivityConfig } from '../../../game-mechanics/models/Activity.model';
import { ACTIONS_MAPPING } from './sub-forms';
import { types } from '../../../game-mechanics/systems/activity/constants';
import { FormDefinition } from '../../../dynamic-forms/models/FormDefinition.model';
import { ConnectedEntities } from '../../../dynamic-forms/models/ConnectedEntities';

export function ACTIVITY_DEF(data: Activity, ent: ConnectedEntities): BaseControl[] {
    data = data || {configs: []};
    const activityTypes: Option[] = [
        {
            value: types.ATTACK_FIELD,
            label: ACTIONS_MAPPING[types.ATTACK_FIELD].name
        }, {
            value: types.DEFEND_FIELD,
            label: ACTIONS_MAPPING[types.DEFEND_FIELD].name
        }, {
            value: types.MINE_RESOURCES,
            label: ACTIONS_MAPPING[types.MINE_RESOURCES].name
        }, {
            value: types.ALTER_RESOURCE,
            label: ACTIONS_MAPPING[types.ALTER_RESOURCE].name
        }, {
            value: types.STEAL_QUEST,
            label: ACTIONS_MAPPING[types.STEAL_QUEST].name,
        }, {
            value: types.DISCARD_QUEST,
            label: ACTIONS_MAPPING[types.DISCARD_QUEST].name,
        }, {
            value: types.DRAW_QUEST,
            label: ACTIONS_MAPPING[types.DRAW_QUEST].name,
        }, {
            value: types.CANCEL_ATTACK_FIELD,
            label: ACTIONS_MAPPING[types.CANCEL_ATTACK_FIELD].name
        }, {
            value: types.CANCEL_DEFEND_FIELD,
            label: ACTIONS_MAPPING[types.CANCEL_DEFEND_FIELD].name
        }, {
            value: types.CANCEL_MINE_RESOURCE,
            label: ACTIONS_MAPPING[types.CANCEL_MINE_RESOURCE].name
        }, {
            value: types.CANCEL_ACTIVITY,
            label: ACTIONS_MAPPING[types.CANCEL_ACTIVITY].name
        }, {
            value: types.STEAL_ACTIVITY,
            label: ACTIONS_MAPPING[types.STEAL_ACTIVITY].name
        }, {
            value: types.DISCARD_ACTIVITY,
            label: ACTIONS_MAPPING[types.DISCARD_ACTIVITY].name
        }, {
            value: types.PEEK_QUESTS,
            label: ACTIONS_MAPPING[types.PEEK_QUESTS].name
        }, {
            value: types.PEEK_ACTIVITIES,
            label: ACTIONS_MAPPING[types.PEEK_ACTIVITIES].name
        }
    ];
    activityTypes.sort((a, b) => {
        if (a.label.charAt(0) > b.label.charAt(0)) {
            return 1;
        }
        if (a.label.charAt(0) < b.label.charAt(0)) {
            return -1;
        }
        return 0;
    });
    const activityType = {
        name: 'type',
        controlType: controlTypes.DROPDOWN,
        label: 'Action type',
        options: activityTypes,
        value: ''
    };

    const childTemplate: BaseControl = {
        controlType: controlTypes.DYNAMIC_NESTED_FORM,
        childControls: [activityType],
        childTemplate: activityType,
        subFormMapping: ACTIONS_MAPPING
    };
    const childControls: BaseControl[] = data.configs.map((elem: ActivityConfig) => {
        const subform: FormDefinition = ACTIONS_MAPPING[elem.type].form;
        const childInstance: BaseControl = {
            ...childTemplate, childControls: [
                {
                    ...activityType,
                    value: elem.type
                },

            ]
        };
        if (subform) {
            const addedControls = subform(elem, ent);
            childInstance.childControls = childInstance.childControls.concat(addedControls);
        }
        return childInstance;
    });
    return [
        {
            name: 'name',
            controlType: controlTypes.TEXT_INPUT,
            value: data.name,
            label: 'Action name',
            required: true
        }, {
            name: 'description',
            controlType: controlTypes.TEXT_INPUT,
            value: data.description || '',
            label: 'Action description',
            required: false
        }, {
            name: 'image',
            controlType: controlTypes.IMAGE_BROWSER,
            label: 'Action featured image',
            required: true,
            value: data.image
        }, {
            name: 'configs',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Action configuration',
            addButtonText: 'Add action',
            connectedEntities: ent,
            childControls,
            childTemplate
        }
    ];
}

