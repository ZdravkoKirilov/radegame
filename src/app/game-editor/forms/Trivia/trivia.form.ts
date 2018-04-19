import { Trivia, TriviaAnswer } from '@app/game-mechanics';
import { BaseControl, Option, controlTypes, ConnectedEntities } from '@app/dynamic-forms';
import { composeActivityOptions } from '../helpers';

export function TRIVIA_DEF(data: Trivia, ent: ConnectedEntities): BaseControl[] {
    data = data || { answers: [] };

    const activities = composeActivityOptions(ent);
    const triviaAnswerTemplate: BaseControl = {
        controlType: controlTypes.NESTED_FORM,
        childControls: [
            {
                name: 'description',
                controlType: controlTypes.TEXT_INPUT,
                label: 'Answer text',
                required: false
            }, {
                name: 'image',
                controlType: controlTypes.IMAGE_PICKER,
                label: 'Image',
            }, {
                controlType: controlTypes.BUTTON_GROUP,
                name: 'effect',
                label: 'Effect',
                multiple: true,
                options: activities
            }
        ]
    };

    const answers = data.answers.map(elem => toNestedForm(elem, activities));

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
            value: data.image
        }, {
            name: 'answers',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Trivia answers',
            addButtonText: 'Add answer',
            childControls: answers,
            childTemplate: triviaAnswerTemplate
        }
    ];
}

const toNestedForm = (elem: TriviaAnswer, activities: Option[]): BaseControl => {

    return {
        controlType: controlTypes.NESTED_FORM,
        childControls: [
            {
                name: 'id',
                controlType: controlTypes.TEXT_INPUT,
                value: elem.id,
                hidden: true
            }, {
                name: 'description',
                controlType: controlTypes.TEXT_INPUT,
                value: elem.description,
                label: 'Trivia question',
                required: false
            }, {
                name: 'image',
                controlType: controlTypes.IMAGE_PICKER,
                label: 'Trivia image',
                required: false,
                value: elem.image
            }, {
                controlType: controlTypes.BUTTON_GROUP,
                name: 'effect',
                label: 'Effect',
                multiple: true,
                options: activities,
                value: elem.effect.map(elem => elem.activity)
            }
        ]
    };
};