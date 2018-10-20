import { Condition, QuestCondition, QuestEffect, QUEST_CONDITION as cnd, QUEST_CONDITION } from '@app/game-mechanics';
import { ConnectedEntities, controlTypes, BaseControl, Option } from '@app/dynamic-forms';
import {
    composeActionOptions, composeFieldOptions, composeRoundOptions, composeResourceOptions, composeStageOptions,
    composeFromObject, composeKeywordOptions, composeEntityItem, composeConditionOptions
} from '../helpers';

export function QUEST_DEF(data: Condition = {}, ent: ConnectedEntities): BaseControl[] {
    data = data || <Condition>{ penalty: [], condition: [], award: [] };
    const activities = composeActionOptions(ent);
    const fields = composeFieldOptions(ent);
    const rounds = composeRoundOptions(ent);
    const resources = composeResourceOptions(ent);
    const stages = composeStageOptions(ent);
    const quests = composeConditionOptions(ent);
    const keywords = composeKeywordOptions([ent.resources, ent.factions, ent.actions, ent.fields, ent.conditions]);

    const conditionType = {
        name: 'type',
        controlType: controlTypes.DROPDOWN,
        label: 'Condition type',
        options: composeFromObject(QUEST_CONDITION),
    };

    const cond_childTemplate: BaseControl = {
        controlType: controlTypes.NESTED_FORM,
        childControls: [
            conditionType,
            { name: 'id', hidden: true, controlType: controlTypes.TEXT_INPUT },
            {
                name: 'at_round',
                controlType: controlTypes.DROPDOWN,
                label: 'At round',
                options: rounds
            }, {
                name: 'by_round',
                controlType: controlTypes.DROPDOWN,
                label: 'By round',
                options: rounds
            }, {
                name: 'field',
                controlType: controlTypes.DROPDOWN,
                label: 'Field',
                options: fields
            }, {
                name: 'resource',
                controlType: controlTypes.DROPDOWN,
                label: 'Resource',
                options: resources
            }, {
                name: 'activity',
                controlType: controlTypes.DROPDOWN,
                label: 'Action',
                options: activities
            }, {
                name: 'quest',
                controlType: controlTypes.DROPDOWN,
                label: 'Quest',
                options: quests
            }, {
                name: 'keyword',
                controlType: controlTypes.DROPDOWN,
                label: 'Keyword',
                options: keywords
            }, {
                name: 'amount',
                controlType: controlTypes.NUMBER_INPUT,
                label: 'Amount',
            }
        ],
    };

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
    }, {
        name: 'keywords',
        controlType: controlTypes.TAGS_INPUT,
        value: data.keywords,
        label: 'Keywords',
    }, {
        name: 'image',
        controlType: controlTypes.IMAGE_PICKER,
        label: 'Quest image',
        required: false,
        value: data.image,
        asBase64: true
    }, {
        name: 'stage',
        controlType: controlTypes.DROPDOWN,
        label: 'Stage',
        value: data.stage,
        options: stages,
        showImage: true
    }, {
        name: 'condition',
        controlType: controlTypes.FORM_ARRAY,
        label: 'Quest condition: ',
        addButtonText: 'Add condition',
        connectedEntities: ent,
        childControls: data.condition.map(elem => composeEntityItem(elem, cond_childTemplate)),
        childTemplate: cond_childTemplate
    }, {
        name: 'award',
        controlType: controlTypes.BUTTON_GROUP,
        label: 'Quest award: ',
        options: activities,
        value: data.award,
        valueField: 'activity',
        multiple: true
    }, {
        name: 'penalty',
        controlType: controlTypes.BUTTON_GROUP,
        label: 'Quest penalty: ',
        options: activities,
        value: data.penalty,
        valueField: 'activity',
        multiple: true
    }
    ];
}
