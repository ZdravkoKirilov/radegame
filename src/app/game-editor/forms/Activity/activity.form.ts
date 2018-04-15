import {
    BaseControl, Option, controlTypes,
    FormDefinition, ConnectedEntities, ToggleContext
} from '@app/dynamic-forms';
import {
    Activity, ActivityConfig, ACTIVITY_TYPE as types,
    TARGET_TYPE, ACTION_MODE, ActivityCost
} from '@app/game-mechanics';
import { composeResourceOptions, composeKeywordOptions, combineContexts } from '../helpers';

const toggleContexts = {
    [types.ALTER]: { show: { field: 'type', value: [types.ALTER] } },
    [types.WIN_GAME]: { show: { field: 'type', value: [types.WIN_GAME] } },
    [types.LOSE_GAME]: { show: { field: 'type', value: [types.LOSE_GAME] } }
}

const targets = {
    [TARGET_TYPE.SELF]: { value: TARGET_TYPE.SELF },
    [TARGET_TYPE.ACTIVE_PLAYER]: { value: TARGET_TYPE.ACTIVE_PLAYER },
    [TARGET_TYPE.FIELD]: { value: TARGET_TYPE.FIELD },
    [TARGET_TYPE.OTHER_PLAYER]: { value: TARGET_TYPE.OTHER_PLAYER },
    [TARGET_TYPE.PLAYER]: { value: TARGET_TYPE.PLAYER }
}

export const ACTIVITY_DEF: FormDefinition = (data: Activity, ent: ConnectedEntities): BaseControl[] => {
    data = data || {};
    data.configs = data.configs || [];
    data.cost = data.cost || [];
    const resources = composeResourceOptions(ent);
    const activityTypes: Option[] = Object.keys(types).map(key => ({ value: key, label: types[key] }));
    const modeTypes: Option[] = Object.keys(ACTION_MODE).map(key => ({ value: key, label: ACTION_MODE[key] }));

    const activityType = {
        name: 'type',
        controlType: controlTypes.DROPDOWN,
        label: 'Action type',
        options: activityTypes,
        required: true,
    };

    const childTemplate: BaseControl = {
        controlType: controlTypes.NESTED_FORM,
        childControls: [
            activityType, {
                name: 'resource',
                controlType: controlTypes.DROPDOWN,
                label: 'Specific resource',
                options: resources,
                showImage: true,
                toggleContext: toggleContexts[types.ALTER]
            }, {
                name: 'keyword',
                controlType: controlTypes.DROPDOWN,
                label: 'Or a resource type',
                options: composeKeywordOptions(ent, ['resources']),
                toggleContext: toggleContexts[types.ALTER],
            }, {
                name: 'amount',
                controlType: controlTypes.NUMBER_INPUT,
                label: 'Amount',
                toggleContext: toggleContexts[types.ALTER]
            }, {
                name: 'target',
                controlType: controlTypes.DROPDOWN,
                label: 'Target',
                options: [
                    targets.SELF, targets.OTHER_PLAYER, targets.PLAYER, targets.ACTIVE_PLAYER
                ],
                toggleContext: combineContexts(toggleContexts[types.ALTER],
                    [toggleContexts[types.WIN_GAME], toggleContexts[types.LOSE_GAME]])
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
                label: 'Specific resource',
                showImage: true,
                options: resources,
            }, {
                name: 'keyword',
                controlType: controlTypes.DROPDOWN,
                label: 'Or a resource type',
                options: composeKeywordOptions(ent, ['resources']),
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
            name: 'mode',
            controlType: controlTypes.DROPDOWN,
            options: modeTypes,
            label: 'Action mode',
            value: data.mode,
            toggleContext: null //toggleContext5,
        }, {
            name: 'description',
            controlType: controlTypes.TEXT_INPUT,
            value: data.description || '',
            label: 'Action description',
        }, {
            name: 'keywords',
            controlType: controlTypes.TAGS_INPUT,
            value: data.keywords,
            label: 'Keywords'
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
        nestedForm.childControls = nestedForm.childControls
            .map(child => ({ ...child, value: elem[child.name] }));
        return nestedForm;
    });
}

