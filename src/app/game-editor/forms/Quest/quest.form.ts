import { Quest, QuestCondition, QuestEffect } from '../../../game-mechanics/models/index';
import { BaseControl, Option, SubFormMapping } from '../../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../../dynamic-forms/config/controlTypes';
import { QUEST_CONDITION_MAPPING } from './sub-forms';
import { ConnectedEntities } from '../../../dynamic-forms/models/ConnectedEntities';
import { FormDefinition } from '../../../dynamic-forms/models/FormDefinition.model';
import { composeActivityOptions } from '../helpers';

export function QUEST_DEF(data: Quest = {}, ent: ConnectedEntities): BaseControl[] {
    data = data || <Quest>{
        penalty: [],
        condition: [],
        cost: [],
        award: []
    };
    const activities = composeActivityOptions(ent);

    const conditionOptions: Option[] = Object.keys(QUEST_CONDITION_MAPPING).map(key => {
        return {
            value: key,
            label: QUEST_CONDITION_MAPPING[key].name
        };
    });
    conditionOptions.sort(sortOptions);
    const conditionType = {
        name: 'type',
        controlType: controlTypes.DROPDOWN,
        label: 'Condition type',
        options: conditionOptions,
        value: ''
    };
    const cond_childTemplate: BaseControl = {
        controlType: controlTypes.DYNAMIC_NESTED_FORM,
        childControls: [conditionType],
        childTemplate: conditionType,
        subFormMapping: QUEST_CONDITION_MAPPING
    };
    const cond_childControls: BaseControl[] = createDynamicChildren(
        data.condition,
        cond_childTemplate,
        conditionType,
        QUEST_CONDITION_MAPPING,
        ent
    );

    return [{
        controlType: controlTypes.NUMBER_INPUT,
        hidden: true,
        name: 'id',
        value: data.id,
    }, {
        name: 'name',
        controlType: controlTypes.TEXT_INPUT,
        value: data.name,
        label: 'Quest name',
        required: true
    }, {
        name: 'description',
        controlType: controlTypes.TEXT_INPUT,
        value: data.description,
        label: 'Quest description',
        required: false
    }, {
        name: 'image',
        controlType: controlTypes.IMAGE_BROWSER,
        label: 'Quest image',
        required: false,
        value: data.image
    }, {
        name: 'condition',
        controlType: controlTypes.FORM_ARRAY,
        label: 'Quest condition: ',
        addButtonText: 'Add condition',
        connectedEntities: ent,
        childControls: cond_childControls,
        childTemplate: cond_childTemplate
    },
        {
            name: 'cost',
            controlType: controlTypes.BUTTON_GROUP,
            label: 'Quest cost: ',
            options: activities,
            value: composeValue(data.cost),

        }, {
            name: 'award',
            controlType: controlTypes.BUTTON_GROUP,
            label: 'Quest award: ',
            options: activities,
            value: composeValue(data.award),
        }, {
            name: 'penalty',
            controlType: controlTypes.BUTTON_GROUP,
            label: 'Quest penalty: ',
            options: activities,
            value: composeValue(data.penalty),
        }
    ];
}

function composeValue(data: QuestEffect[]) {
    return data.map(elem => elem.activity);
}

function sortOptions(a: Option, b: Option) {
    if (a.label.charAt(0) > b.label.charAt(0)) {
        return 1;
    }
    if (a.label.charAt(0) < b.label.charAt(0)) {
        return -1;
    }
    return 0;
}

function createDynamicChildren(data: QuestCondition[],
                               childTemplate: BaseControl,
                               typeSwitcher: BaseControl,
                               formMapping: SubFormMapping,
                               ent: ConnectedEntities): BaseControl[] {
    return data ? data.map((elem: QuestCondition) => {
        const subform: FormDefinition = formMapping[elem.type].form;
        const childInstance: BaseControl = {
            ...childTemplate, childControls: [{
                ...typeSwitcher,
                value: elem.type
            },]
        };
        if (subform) {
            const addedControls = subform(elem, ent);
            childInstance.childControls = childInstance.childControls.concat(addedControls);
        }
        return childInstance;
    }) : [];
}
