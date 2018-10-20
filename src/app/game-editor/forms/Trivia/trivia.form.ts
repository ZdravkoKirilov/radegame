import { Choice, ChoiceOption } from '@app/game-mechanics';
import { BaseControl, Option, controlTypes, ConnectedEntities } from '@app/dynamic-forms';
import { composeActionOptions, composeEntityItem } from '../helpers';

export function TRIVIA_DEF(data: Choice, ent: ConnectedEntities): BaseControl[] {
    data = data || { answers: [] };

    const activities = composeActionOptions(ent);
    const triviaAnswerTemplate: BaseControl = {
        controlType: controlTypes.NESTED_FORM,
        childControls: [
            { name: 'id', controlType: controlTypes.TEXT_INPUT, hidden: true },
            {
                name: 'description',
                controlType: controlTypes.TEXT_INPUT,
                label: 'Answer text',
                required: false
            }, {
                name: 'image',
                controlType: controlTypes.IMAGE_PICKER,
                label: 'Image',
                asBase64: true
            }, {
                controlType: controlTypes.BUTTON_GROUP,
                name: 'effect',
                label: 'Effect',
                multiple: true,
                options: activities,
                valueField: 'activity',
                value: []
            }
        ]
    };

    return [
        {
            name: 'name',
            controlType: controlTypes.TEXT_INPUT,
            value: data.name,
            label: 'Trivia name',
            required: true
        }, {
            name: 'description',
            controlType: controlTypes.TEXT_INPUT,
            value: data.description,
            label: 'Trivia question',
            required: false
        }, {
            name: 'image',
            controlType: controlTypes.IMAGE_PICKER,
            label: 'Trivia image',
            required: false,
            value: data.image,
            asBase64: true
        }, {
            name: 'answers',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Trivia answers',
            addButtonText: 'Add answer',
            childControls: data.answers.map(elem => composeEntityItem(elem, triviaAnswerTemplate)),
            childTemplate: triviaAnswerTemplate
        }
    ];
}