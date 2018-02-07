import { Trivia, TRIVIA_MODES } from '../../../game-mechanics/models/index';
import { BaseControl, Option } from '../../../dynamic-forms/models/Base.model';
import { controlTypes } from '../../../dynamic-forms/config/controlTypes';
import { ConnectedEntities } from '../../../dynamic-forms/models/ConnectedEntities';
import { composeActivityOptions } from '../helpers';

const triviaModes: Option[] = Object.keys(TRIVIA_MODES).map(key => {
    return {
        value: key,
        label: TRIVIA_MODES[key]
    };
});

export function TRIVIA_DEF(data: Trivia, ent: ConnectedEntities): BaseControl[] {
    data = data || {};
    const activities = composeActivityOptions(ent);

    const triviaAnswerTemplate = {
        controlType: controlTypes.NESTED_FORM,
        childControls: [
            {
                name: 'description',
                controlType: controlTypes.TEXT_INPUT,
                label: 'Answer text',
                required: false
            }, {
                name: 'image',
                controlType: controlTypes.IMAGE_BROWSER,
                label: 'Image',
            }, {
                controlType: controlTypes.BUTTON_GROUP,
                name: 'result',
                label: 'Result',
                options: activities
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
            controlType: controlTypes.IMAGE_BROWSER,
            label: 'Trivia image',
            required: false,
            value: data.image
        }, {
            controlType: controlTypes.DROPDOWN,
            name: 'mode',
            label: 'Trivia mode',
            value: data.mode,
            options: triviaModes,
        }, {
            name: 'answers',
            controlType: controlTypes.FORM_ARRAY,
            label: 'Trivia answers',
            addButtonText: 'Add answer',
            childControls: [],
            childTemplate: triviaAnswerTemplate
        }
    ];
}
