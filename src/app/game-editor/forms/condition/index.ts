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
        type: controlTypes.FORM,
        children: [
            conditionType,
            { name: 'id', hidden: true, type: controlTypes.TEXT_INPUT },
            {
                name: 'at_round',
                type: controlTypes.DROPDOWN,
                label: 'At round',
                options: rounds
            }, {
                name: 'by_round',
                type: controlTypes.DROPDOWN,
                label: 'By round',
                options: rounds
            }, {
                name: 'field',
                type: controlTypes.DROPDOWN,
                label: 'Field',
                options: fields
            }, {
                name: 'resource',
                type: controlTypes.DROPDOWN,
                label: 'Resource',
                options: resources
            }, {
                name: 'activity',
                type: controlTypes.DROPDOWN,
                label: 'Action',
                options: activities
            }, {
                name: 'quest',
                type: controlTypes.DROPDOWN,
                label: 'Quest',
                options: quests
            }, {
                name: 'keyword',
                type: controlTypes.DROPDOWN,
                label: 'Keyword',
                options: keywords
            }, {
                name: 'amount',
                type: controlTypes.NUMBER_INPUT,
                label: 'Amount',
            }
        ],
    };

    return [{
        type: controlTypes.NUMBER_INPUT,
        hidden: true,
        name: 'id',
        value: data.id,
    }, {
        name: 'name',
        type: controlTypes.TEXT_INPUT,
        value: data.name,
        label: 'Quest name',
        required: true
    }, {
        name: 'description',
        type: controlTypes.TEXT_INPUT,
        value: data.description,
        label: 'Quest description',
    }, {
        name: 'keywords',
        type: controlTypes.TAGS_INPUT,
        value: data.keywords,
        label: 'Keywords',
    }, {
        name: 'image',
        type: controlTypes.IMAGE_PICKER,
        label: 'Quest image',
        required: false,
        value: data.image,
        asBase64: true
    }, {
        name: 'stage',
        type: controlTypes.DROPDOWN,
        label: 'Stage',
        value: data.stage,
        options: stages,
        showImage: true
    }, {
        name: 'condition',
        type: controlTypes.GROUP,
        label: 'Quest condition: ',
        addButtonText: 'Add condition',
        connectedEntities: ent,
        children: data.condition.map(elem => composeEntityItem(elem, cond_childTemplate)),
        childTemplate: cond_childTemplate
    }, {
        name: 'award',
        type: controlTypes.BUTTON_GROUP,
        label: 'Quest award: ',
        options: activities,
        value: data.award,
        valueField: 'activity',
        multiple: true
    }, {
        name: 'penalty',
        type: controlTypes.BUTTON_GROUP,
        label: 'Quest penalty: ',
        options: activities,
        value: data.penalty,
        valueField: 'activity',
        multiple: true
    }
    ];
}
