import { BaseControl, Option, controlTypes, FormDefinition, ConnectedEntities } from '@app/dynamic-forms';
import { Activity, ActivityConfig, types, targetTypes, actionModes } from '@app/game-mechanics';
import { composeResourceOptions } from '../helpers';

export const ACTIVITY_DEF: FormDefinition = (data: Activity, ent: ConnectedEntities): BaseControl[] => {
    data = data || {};
    data.configs = data.configs || [];
    const resources = composeResourceOptions(ent);
    const activityTypes: Option[] = Object.keys(types).map(key => {
        return { value: key, label: types[key] };
    });
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
        required: true,
    };

    const toggleContext1 = {
        show: {
            field: activityType.name,
            value: [types.ATTACK_FIELD, types.DEFEND_FIELD, types.MINE_RESOURCES]
        }
    };
    const toggleContext2 = {
        show: {
            field: activityType.name,
            value: [types.STEAL_QUEST, types.DISCARD_QUEST, types.DRAW_QUEST, types.STEAL_ACTIVITY, types.DISCARD_ACTIVITY,
            types.ALTER_RESOURCE]
        }
    };
    const toggleContext3 = {
        show: {
            field: activityType.name,
            value: [types.ALTER_RESOURCE]
        }
    };
    const toggleContext4 = {
        show: {
            field: activityType.name,
            value: [types.CANCEL_ATTACK_FIELD, types.CANCEL_DEFEND_FIELD, types.CANCEL_MINE_RESOURCE]
        }
    };
    const toggleContext5 = {
        show: {
            field: activityType.name,
            value: [types.PEEK_QUESTS, types.PEEK_ACTIVITIES]
        }
    }

    const childTemplate: BaseControl = {
        controlType: controlTypes.NESTED_FORM,
        childControls: [
            activityType,
            // start context 1
            {
                name: 'amount',
                controlType: controlTypes.NUMBER_INPUT,
                label: 'Bonus amount',
                toggleContext: toggleContext1,
            }, {
                name: 'mode',
                controlType: controlTypes.DROPDOWN,
                options: [{ label: 'Trigger', value: actionModes.TRIGGER }],
                label: 'Action mode',
                defaultValue: actionModes.TRIGGER,
                toggleContext: toggleContext1,
            }, {
                name: 'target',
                controlType: controlTypes.DROPDOWN,
                options: [{ label: 'Field', value: targetTypes.FIELD }],
                defaultValue: targetTypes.FIELD,
                label: 'Action target',
                toggleContext: toggleContext1,
            },
            // start context2
            {
                name: 'amount',
                controlType: controlTypes.NUMBER_INPUT,
                label: 'Amount',
                toggleContext: toggleContext2,
            }, {
                name: 'mode',
                controlType: controlTypes.DROPDOWN,
                options: [
                    { label: 'Trigger', value: actionModes.TRIGGER },
                    { label: 'Trap', value: actionModes.HIDDEN },
                    { label: 'Passive', value: actionModes.PASSIVE },
                ],
                label: 'Action mode',
                toggleContext: toggleContext2,
            }, {
                name: 'target',
                controlType: controlTypes.DROPDOWN,
                options: [
                    { label: 'Player', value: targetTypes.SELF },
                    { label: 'Active Player', value: targetTypes.ACTIVE_PLAYER },
                    { label: 'Self', value: targetTypes.SELF },
                    { label: 'Other player', value: targetTypes.OTHER_PLAYER },
                ],
                label: 'Action target',
                toggleContext: toggleContext2,
            },
            // start context 3
            {
                name: 'resource',
                controlType: controlTypes.DROPDOWN,
                label: 'Resource',
                options: resources,
                toggleContext: toggleContext3,
                required: true
            },
            // start context 4
            {
                name: 'mode',
                controlType: controlTypes.DROPDOWN,
                options: [
                    { label: 'Trigger', value: actionModes.TRIGGER },
                    { label: 'Trap', value: actionModes.HIDDEN }
                ],
                label: 'Action mode',
                toggleContext: toggleContext4
            }, {
                name: 'target',
                controlType: controlTypes.DROPDOWN,
                options: [{ label: 'Field', value: targetTypes.FIELD }],
                label: 'Action target',
                toggleContext: toggleContext4,
                defaultValue: targetTypes.FIELD
            },
            // start context 5
            {
                name: 'amount',
                controlType: controlTypes.NUMBER_INPUT,
                label: 'Number of peeks',
                toggleContext: toggleContext5,
            }, {
                name: 'mode',
                controlType: controlTypes.DROPDOWN,
                options: [
                    { label: 'Trigger', value: actionModes.TRIGGER },
                    { label: 'Trap', value: actionModes.HIDDEN },
                    { label: 'Passive', value: actionModes.PASSIVE }
                ],
                label: 'Action mode',
                toggleContext: toggleContext5,
            }, {
                name: 'target',
                controlType: controlTypes.DROPDOWN,
                options: [
                    { label: 'Other player', value: targetTypes.OTHER_PLAYER },
                    { label: 'Active player', value: targetTypes.ACTIVE_PLAYER }
                ],
                label: 'Action target',
                toggleContext: toggleContext5
            }
        ],
    };
    const childControls: BaseControl[] = composeActivityConfigs(data.configs, childTemplate);

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
        }, {
            name: 'image',
            controlType: controlTypes.IMAGE_PICKER,
            label: 'Action featured image',
            required: true,
            value: data.image
        }, {
            name: 'configs',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Action configuration',
            addButtonText: 'Add activity',
            connectedEntities: ent,
            minItems: 1,
            childControls,
            childTemplate
        }
    ];
}

function composeActivityConfigs(configs: ActivityConfig[], template: BaseControl): BaseControl[] {
    return configs.map(elem => {
        const nestedForm = { ...template };
        nestedForm.childControls = nestedForm.childControls.map(child => {
            return { ...child, value: elem[child.name] };
        });
        return nestedForm;
    });
}

