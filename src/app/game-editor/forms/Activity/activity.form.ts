import { BaseControl, Option, controlTypes, FormDefinition, ConnectedEntities } from '@app/dynamic-forms';
import { Activity, ActivityConfig, activityTypes as types, targetTypes, actionModes, ActivityCost } from '@app/game-mechanics';
import { composeResourceOptions } from '../helpers';

export const ACTIVITY_DEF: FormDefinition = (data: Activity, ent: ConnectedEntities): BaseControl[] => {
    data = data || {};
    data.configs = data.configs || [];
    data.cost = data.cost || [];
    const resources = composeResourceOptions(ent);
    const activityTypes: Option[] = Object.keys(types).map(key => ({ value: key, label: types[key] }));

    const activityType = {
        name: 'type',
        controlType: controlTypes.DROPDOWN,
        label: 'Action type',
        options: activityTypes,
        required: true,
    };

    // const toggleContext1 = {
    //     show: {
    //         field: activityType.name,
    //         value: [activityTypes.ATTACK_FIELD, activityTypes.DEFEND_FIELD, activityTypes.MINE_RESOURCES]
    //     }
    // };
    // const toggleContext2 = {
    //     show: {
    //         field: activityType.name,
    //         value: [activityTypes.STEAL_QUEST, activityTypes.DISCARD_QUEST, activityTypes.DRAW_QUEST, activityTypes.STEAL_ACTIVITY, activityTypes.DISCARD_ACTIVITY,
    //         activityTypes.ALTER_RESOURCE]
    //     }
    // };
    // const toggleContext3 = {
    //     show: {
    //         field: activityType.name,
    //         value: [activityTypes.ALTER_RESOURCE]
    //     }
    // };
    // const toggleContext4 = {
    //     show: {
    //         field: activityType.name,
    //         value: [activityTypes.CANCEL_ATTACK_FIELD, activityTypes.CANCEL_DEFEND_FIELD, activityTypes.CANCEL_MINE_RESOURCE]
    //     }
    // };
    // const toggleContext5 = {
    //     show: {
    //         field: activityType.name,
    //         value: [activityTypes.PEEK_QUESTS, activityTypes.PEEK_ACTIVITIES]
    //     }
    // }

    const childTemplate: BaseControl = {
        controlType: controlTypes.NESTED_FORM,
        childControls: [
            activityType,
            // start context 1
            {
                name: 'amount',
                controlType: controlTypes.NUMBER_INPUT,
                label: 'Bonus amount',
                toggleContext: null //toggleContext1,
            }, {
                name: 'mode',
                controlType: controlTypes.DROPDOWN,
                options: [{ label: 'Trigger', value: actionModes.TRIGGER }],
                label: 'Action mode',
                defaultValue: actionModes.TRIGGER,
                toggleContext: null //toggleContext1,
            }, {
                name: 'target',
                controlType: controlTypes.DROPDOWN,
                options: [{ label: 'Field', value: targetTypes.FIELD }],
                defaultValue: targetTypes.FIELD,
                label: 'Action target',
                toggleContext: null //toggleContext1,
            },
            // start context2
            {
                name: 'amount',
                controlType: controlTypes.NUMBER_INPUT,
                label: 'Amount',
                toggleContext: null //toggleContext2,
            }, {
                name: 'mode',
                controlType: controlTypes.DROPDOWN,
                options: [
                    { label: 'Trigger', value: actionModes.TRIGGER },
                ],
                label: 'Action mode',
                toggleContext: null //toggleContext2,
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
                toggleContext: null //toggleContext2,
            },
            // start context 3
            {
                name: 'resource',
                controlType: controlTypes.DROPDOWN,
                label: 'Resource',
                options: resources,
                toggleContext: null, //toggleContext3,
                required: true
            },
            // start context 4
            {
                name: 'mode',
                controlType: controlTypes.DROPDOWN,
                options: [
                    { label: 'Trigger', value: actionModes.TRIGGER },
                ],
                label: 'Action mode',
                toggleContext: null //toggleContext4
            }, {
                name: 'target',
                controlType: controlTypes.DROPDOWN,
                options: [{ label: 'Field', value: targetTypes.FIELD }],
                label: 'Action target',
                toggleContext: null, //toggleContext4,
                defaultValue: targetTypes.FIELD
            },
            // start context 5
            {
                name: 'amount',
                controlType: controlTypes.NUMBER_INPUT,
                label: 'Number of peeks',
                toggleContext: null //toggleContext5,
            }, {
                name: 'mode',
                controlType: controlTypes.DROPDOWN,
                options: [
                    { label: 'Trigger', value: actionModes.TRIGGER },
                ],
                label: 'Action mode',
                toggleContext: null //toggleContext5,
            }, {
                name: 'target',
                controlType: controlTypes.DROPDOWN,
                options: [
                    { label: 'Other player', value: targetTypes.OTHER_PLAYER },
                    { label: 'Active player', value: targetTypes.ACTIVE_PLAYER }
                ],
                label: 'Action target',
                toggleContext: null //toggleContext5
            }
        ],
    };
    const childControls: BaseControl[] = composeActivityConfigs(data.configs, childTemplate);

    const costTemplate = <BaseControl>{
        controlType: controlTypes.NESTED_FORM,
        childControls: [
            {
                name: 'resource',
                controlType: controlTypes.DROPDOWN,
                label: 'Resource',
                showImage: true,
                options: resources,
                required: true
            }, {
                name: 'amount',
                controlType: controlTypes.NUMBER_INPUT,
                label: 'Amount',
                required: true
            }
        ]
    };
    const costChildControls = composeCost(data.cost, costTemplate);

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
            name: 'cost',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Action cost',
            addButtonText: 'Add cost',
            childTemplate: costTemplate,
            childControls: costChildControls
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
        nestedForm.childControls = nestedForm.childControls.map(child => ({ ...child, value: elem[child.name] }));
        return nestedForm;
    });
}

function composeCost(cost: ActivityCost[], template: BaseControl): BaseControl[] {
    return cost.map(elem => {
        const nestedForm = { ...template };
        nestedForm.childControls = nestedForm.childControls.map(child => ({ ...child, value: elem[child.name] }));
        return nestedForm;
    });
}

