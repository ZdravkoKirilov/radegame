import { Field, FieldResource } from '@app/game-mechanics';
import { BaseControl, controlTypes, ConnectedEntities, FormDefinition } from '@app/dynamic-forms';
import { composeConditionOptions, composeActionOptions, composeResourceOptions } from '../helpers';

export const FIELD_DEF: FormDefinition = (data: Field, ent: ConnectedEntities) => {
    data = data || {};

    const income = data && data.income ? data.income.map((elem: FieldResource): BaseControl => {
        return {
            type: controlTypes.FORM,
            children: [
                {
                    name: 'resource',
                    type: controlTypes.DROPDOWN,
                    label: 'Resource',
                    required: true,
                    options: composeResourceOptions(ent),
                    value: elem.resource
                }, {
                    name: 'quantity',
                    type: controlTypes.NUMBER_INPUT,
                    label: 'Quantity',
                    required: true,
                    value: elem.quantity
                }
            ]
        };
    }) : [];
    const cost = data && data.cost ? data.cost.map((elem: FieldResource): BaseControl => {
        return {
            type: controlTypes.FORM,
            children: [
                {
                    name: 'resource',
                    type: controlTypes.DROPDOWN,
                    label: 'Resource',
                    required: true,
                    options: composeResourceOptions(ent),
                    value: elem.resource
                }, {
                    name: 'quantity',
                    type: controlTypes.NUMBER_INPUT,
                    label: 'Quantity',
                    required: true,
                    value: elem.quantity
                }
            ]
        };
    }) : [];
    return [
        {
            name: 'name',
            type: controlTypes.TEXT_INPUT,
            value: data.name,
            label: 'Pick field name',
            required: true
        }, {
            name: 'description',
            type: controlTypes.TEXT_INPUT,
            value: data.description,
            label: 'Field description',
        }, {
            name: 'keywords',
            type: controlTypes.TAGS_INPUT,
            value: data.keywords,
            label: 'Keywords',
        }, {
            name: 'image',
            type: controlTypes.IMAGE_PICKER,
            label: 'Choose field image',
            required: false,
            value: data.image
        }, {
            name: 'income',
            type: controlTypes.GROUP,
            label: 'Pick income resources: ',
            addButtonText: 'Add new income resource',
            children: income,
            childTemplate: {
                type: controlTypes.FORM,
                children: [
                    {
                        name: 'resource',
                        type: controlTypes.DROPDOWN,
                        label: 'Resource',
                        required: true,
                        options: composeResourceOptions(ent)
                    }, {
                        name: 'quantity',
                        type: controlTypes.NUMBER_INPUT,
                        label: 'Quantity',
                        required: true
                    }
                ]
            }
        }, {
            name: 'cost',
            type: controlTypes.GROUP,
            label: 'Pick field cost: ',
            addButtonText: 'Add new cost',
            children: cost,
            childTemplate: {
                type: controlTypes.FORM,
                children: [
                    {
                        name: 'resource',
                        type: controlTypes.DROPDOWN,
                        label: 'Resource',
                        required: true,
                        options: composeResourceOptions(ent)
                    }, {
                        name: 'quantity',
                        type: controlTypes.NUMBER_INPUT,
                        label: 'Quantity',
                        required: true
                    }
                ]
            }
        }, {
            name: 'quests',
            type: controlTypes.BUTTON_GROUP,
            multiple: true,
            label: 'Quest pool',
            value: data && data.quests ? data.quests.map(elem => elem.quest) : [],
            options: composeConditionOptions(ent),
        }, {
            name: 'activities',
            type: controlTypes.BUTTON_GROUP,
            multiple: true,
            label: 'Activity pool',
            value: data && data.activities ? data.activities.map(elem => elem.activity) : [],
            options: composeActionOptions(ent),
        },
    ];
};
