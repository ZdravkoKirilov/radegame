import {
    BaseControl, Option, controlTypes,
    FormDefinition, ConnectedEntities, ToggleContext
} from '@app/dynamic-forms';
import {
    GameAction, ActionConfig, ACTION_TYPE as types,
    TARGET_TYPE, ACTION_MODE
} from '@app/game-mechanics';
import {
    composeResourceOptions, composeKeywordOptions, combineContexts,
    composeConditionOptions, composeChoiceOptions, composeEntityItem
} from '../helpers';

const toggleContexts: { [key: string]: ToggleContext } = {
    [types.WIN_GAME]: { show: { field: 'type', equals: [types.WIN_GAME] } },
    [types.LOSE_GAME]: { show: { field: 'type', equals: [types.LOSE_GAME] } },
    [types.TRIGGER_QUEST]: { show: { field: 'type', equals: [types.TRIGGER_QUEST] } },
    [types.TRIGGER_TRIVIA]: { show: { field: 'type', equals: [types.TRIGGER_TRIVIA] } },
    [types.MOVE]: { show: { field: 'type', equals: [types.MOVE] } },
    [types.ALTER]: { show: { field: 'type', equals: [types.ALTER] } },
    [types.COLLECT]: { show: { field: 'type', equals: [types.COLLECT] } },
    [types.DRAW]: { show: { field: 'type', equals: [types.DRAW] } }
}

const targets: { [key: string]: Option } = {
    [TARGET_TYPE.SELF]: {
        value: TARGET_TYPE.SELF,
        context: { disable: { field: 'type', equals: [types.ALTER] }, defaultValue: '' }
    },
    [TARGET_TYPE.ACTIVE_PLAYER]: {
        value: TARGET_TYPE.ACTIVE_PLAYER,
        context: { disable: { field: 'type', equals: [] }, defaultValue: '' }
    },
    [TARGET_TYPE.OTHER_PLAYER]: {
        value: TARGET_TYPE.OTHER_PLAYER,
        context: { disable: { field: 'type', equals: [] }, defaultValue: '' }
    },
    [TARGET_TYPE.PLAYER]: {
        value: TARGET_TYPE.PLAYER,
        context: { disable: { field: 'type', equals: [] }, defaultValue: '' }
    }
}

export const ACTIVITY_DEF: FormDefinition = (data: GameAction, ent: ConnectedEntities): BaseControl[] => {
    data = data || {};
    data.configs = data.configs || [];
    data.cost = data.cost || [];
    const resources = composeResourceOptions(ent);
    const quests = composeConditionOptions(ent);
    const trivia = composeChoiceOptions(ent);
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
                name: 'target',
                controlType: controlTypes.DROPDOWN,
                label: 'Target',
                options: Object.values(targets),
                required: true
            }, {
                name: 'quest',
                controlType: controlTypes.DROPDOWN,
                label: 'Quest',
                options: quests,
                showImage: true,
                toggleContext: toggleContexts[types.TRIGGER_QUEST]
            }, {
                name: 'trivia',
                controlType: controlTypes.DROPDOWN,
                label: 'Trivia',
                options: trivia,
                showImage: true,
                toggleContext: toggleContexts[types.TRIGGER_TRIVIA]
            }, {
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
                options: composeKeywordOptions([ent.resources]),
                toggleContext: toggleContexts[types.ALTER],
            }, {
                name: 'amount',
                controlType: controlTypes.NUMBER_INPUT,
                label: 'Amount',
                toggleContext: toggleContexts[types.ALTER]
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
                options: composeKeywordOptions([ent.resources]),
            }, {
                name: 'amount',
                controlType: controlTypes.NUMBER_INPUT,
                label: 'Amount',
                required: true
            }
        ]
    };

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
            value: data.image,
            asBase64: true
        }, {
            name: 'configs',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Action configuration',
            addButtonText: 'Add activity',
            connectedEntities: ent,
            minItems: 0,
            childControls,
            childTemplate
        }
    ];
}

function composeActivityConfigs(configs: ActionConfig[], template: BaseControl): BaseControl[] {
    return configs.map(elem => {
        const nestedForm = { ...template };
        nestedForm.childControls = nestedForm.childControls.map(child => ({ ...child, value: elem[child.name] }));
        return nestedForm;
    });
}

// function composeCost(cost: ActivityCost[], template: BaseControl): BaseControl[] {
//     return cost.map(elem => {
//         const nestedForm = { ...template };
//         nestedForm.childControls = nestedForm.childControls
//             .map(child => ({ ...child, value: elem[child.name] }));
//         return nestedForm;
//     });
// }

