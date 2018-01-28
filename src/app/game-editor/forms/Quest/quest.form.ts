import { Quest, QuestSubType } from '../../../game-mechanics/models/index';
import { BaseControl, Option, SubFormMapping } from '../../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../../dynamic-forms/config/controlTypes';
import { QUEST_CONDITION_MAPPING, QUEST_COST_MAPPING, QUEST_PENALTY_MAPPING, QUEST_AWARD_MAPPING } from './sub-forms';
import { ConnectedEntities } from '../../../dynamic-forms/models/ConnectedEntities';
import { FormDefinition } from '../../../dynamic-forms/models/FormDefinition.model';

export function QUEST_DEF(data: Quest = {}, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

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


    const costOptions: Option[] = Object.keys(QUEST_COST_MAPPING).map(key => {
        return {
            value: key,
            label: QUEST_COST_MAPPING[key].name
        };
    });
    costOptions.sort(sortOptions);
    const costType = {
        name: 'type',
        controlType: controlTypes.DROPDOWN,
        label: 'Quest cost',
        options: costOptions,
        value: ''
    };
    const cost_childTemplate: BaseControl = {
        controlType: controlTypes.DYNAMIC_NESTED_FORM,
        childControls: [costType],
        childTemplate: costType,
        subFormMapping: QUEST_COST_MAPPING
    };
    const cost_childControls = createDynamicChildren(
        data.cost,
        cost_childTemplate,
        costType,
        QUEST_COST_MAPPING,
        ent
    );

    const penaltyOptions: Option[] = Object.keys(QUEST_PENALTY_MAPPING).map(key => {
        return {
            value: key,
            label: QUEST_PENALTY_MAPPING[key].name
        };
    });
    penaltyOptions.sort(sortOptions);
    const penaltyType = {
        name: 'type',
        controlType: controlTypes.DROPDOWN,
        label: 'Penalty type',
        options: penaltyOptions,
        value: ''
    };
    const penalty_childTemplate: BaseControl = {
        controlType: controlTypes.DYNAMIC_NESTED_FORM,
        childControls: [penaltyType],
        childTemplate: penaltyType,
        subFormMapping: QUEST_PENALTY_MAPPING
    };
    const penalty_childControls = createDynamicChildren(
        data.penalty,
        penalty_childTemplate,
        penaltyType,
        QUEST_PENALTY_MAPPING,
        ent
    );

    const awardOptions: Option[] = Object.keys(QUEST_AWARD_MAPPING).map(key => {
        return {
            value: key,
            label: QUEST_AWARD_MAPPING[key].name
        };
    });
    awardOptions.sort(sortOptions);
    const awardType = {
        name: 'type',
        controlType: controlTypes.DROPDOWN,
        label: 'Award type',
        options: awardOptions,
        value: ''
    };
    const award_childTemplate: BaseControl = {
        controlType: controlTypes.DYNAMIC_NESTED_FORM,
        childControls: [awardType],
        childTemplate: awardType,
        subFormMapping: QUEST_AWARD_MAPPING
    };
    const award_childControls = createDynamicChildren(
        data.award,
        award_childTemplate,
        awardType,
        QUEST_AWARD_MAPPING,
        ent,
    );

    return [
        {
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
        }, {
            name: 'cost',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Quest cost: ',
            addButtonText: 'Add cost',
            connectedEntities: ent,
            childControls: cost_childControls,
            childTemplate: cost_childTemplate
        }, {
            name: 'penalty',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Quest penalty: ',
            addButtonText: 'Add penalty',
            connectedEntities: ent,
            childControls: penalty_childControls,
            childTemplate: penalty_childTemplate
        }, {
            name: 'award',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Quest award: ',
            addButtonText: 'Add award',
            connectedEntities: ent,
            childControls: award_childControls,
            childTemplate: award_childTemplate
        }
    ];
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

function createDynamicChildren(
    data: QuestSubType[],
    childTemplate: BaseControl,
    typeSwitcher: BaseControl,
    formMapping: SubFormMapping,
    ent: ConnectedEntities,
): BaseControl[] {
    return data.map((elem: QuestSubType) => {
        const subform: FormDefinition = formMapping[elem.type].form;
        const childInstance: BaseControl = {
            ...childTemplate, childControls: [
                {
                    ...typeSwitcher,
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
}
