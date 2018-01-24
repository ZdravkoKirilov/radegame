import { Quest } from '../../../game-mechanics/models/index';
import { BaseControl, Option } from '../../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../../dynamic-forms/config/controlTypes';
import { QUEST_CONDITION_MAPPING, QUEST_COST_MAPPING, QUEST_PENALTY_MAPPING, QUEST_AWARD_MAPPING } from './sub-forms';
import { ConnectedEntities } from '../../../dynamic-forms/models/ConnectedEntities';

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
            childControls: [],
            childTemplate: cond_childTemplate
        }, {
            name: 'cost',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Quest cost: ',
            addButtonText: 'Add cost',
            connectedEntities: ent,
            childControls: [],
            childTemplate: cost_childTemplate
        }, {
            name: 'penalty',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Quest penalty: ',
            addButtonText: 'Add penalty',
            connectedEntities: ent,
            childControls: [],
            childTemplate: penalty_childTemplate
        }, {
            name: 'award',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Quest award: ',
            addButtonText: 'Add award',
            connectedEntities: ent,
            childControls: [],
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
