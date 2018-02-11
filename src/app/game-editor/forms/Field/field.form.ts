import { Resource } from '../../../game-mechanics/models/Resource.model';
import { Field, FieldResource } from '../../../game-mechanics/models/BoardField.model';
import { BaseControl } from '../../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../../dynamic-forms/config/controlTypes';
import { composeQuestOptions, composeActivityOptions, composeResourceOptions } from '../helpers';
import { ConnectedEntities } from '../../../dynamic-forms/models/ConnectedEntities';
import { FormDefinition } from '../../../dynamic-forms/models/FormDefinition.model';

export const FIELD_DEF: FormDefinition = (data: Field, ent: ConnectedEntities) => {
    data = data || {income: [], cost: [], quests: [], activities: []};

    const income = data.income.map((elem: FieldResource): BaseControl => {
        return {
            controlType: controlTypes.NESTED_FORM,
            childControls: [
                {
                    name: 'resource',
                    controlType: controlTypes.DROPDOWN,
                    label: 'Resource',
                    required: true,
                    options: composeResourceOptions(ent),
                    value: elem.resource
                }, {
                    name: 'quantity',
                    controlType: controlTypes.NUMBER_INPUT,
                    label: 'Quantity',
                    required: true,
                    value: elem.quantity
                }
            ]
        };
    });
    const cost = data.cost.map((elem: FieldResource): BaseControl => {
        return {
            controlType: controlTypes.NESTED_FORM,
            childControls: [
                {
                    name: 'resource',
                    controlType: controlTypes.DROPDOWN,
                    label: 'Resource',
                    required: true,
                    options: composeResourceOptions(ent),
                    value: elem.resource
                }, {
                    name: 'quantity',
                    controlType: controlTypes.NUMBER_INPUT,
                    label: 'Quantity',
                    required: true,
                    value: elem.quantity
                }
            ]
        };
    });
    return [
        {
            name: 'name',
            controlType: controlTypes.TEXT_INPUT,
            value: data.name,
            label: 'Pick field name',
            required: true
        }, {
            name: 'description',
            controlType: controlTypes.TEXT_INPUT,
            value: data.description,
            label: 'Field description',
            required: false
        }, {
            name: 'image',
            controlType: controlTypes.IMAGE_BROWSER,
            label: 'Choose field image',
            required: false,
            value: data.image
        }, {
            name: 'income',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Pick income resources: ',
            addButtonText: 'Add new income resource',
            childControls: income,
            childTemplate: {
                controlType: controlTypes.NESTED_FORM,
                childControls: [
                    {
                        name: 'resource',
                        controlType: controlTypes.DROPDOWN,
                        label: 'Resource',
                        required: true,
                        options: composeResourceOptions(ent)
                    }, {
                        name: 'quantity',
                        controlType: controlTypes.NUMBER_INPUT,
                        label: 'Quantity',
                        required: true
                    }
                ]
            }
        }, {
            name: 'cost',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Pick field cost: ',
            addButtonText: 'Add new cost',
            childControls: cost,
            childTemplate: {
                controlType: controlTypes.NESTED_FORM,
                childControls: [
                    {
                        name: 'resource',
                        controlType: controlTypes.DROPDOWN,
                        label: 'Resource',
                        required: true,
                        options: composeResourceOptions(ent)
                    }, {
                        name: 'quantity',
                        controlType: controlTypes.NUMBER_INPUT,
                        label: 'Quantity',
                        required: true
                    }
                ]
            }
        }, {
            name: 'quests',
            controlType: controlTypes.BUTTON_GROUP,
            multiple: true,
            label: 'Quest pool',
            value: data.quests.map(elem => elem.quest),
            options: composeQuestOptions(ent),
        }, {
            name: 'activities',
            controlType: controlTypes.BUTTON_GROUP,
            multiple: true,
            label: 'Activity pool',
            value: data.activities.map(elem => elem.activity),
            options: composeActivityOptions(ent),
        },
    ];
};
