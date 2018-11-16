import {
    BaseControl,
    FormDefinition, ConnectedEntities, parse
} from '@app/dynamic-forms';
import { Phase } from '@app/game-mechanics';
import { composeEntityOptions } from '../helpers';

export const composePhaseForm: FormDefinition = (data: Phase, ent?: ConnectedEntities) => {
    data = data || {} as Phase;
    const settings = data.settings || [];

    const template = `
        <Form>
            <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>
            
            <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>

            <TextInput name='description' label='Description'>{data.description}</TextInput>

            <ImagePicker name='image' label='Image' required='{true}' asBase64='{true}'>{data.image}</ImagePicker>

            <TagsInput name='keywords' label='Keywords'>{data.keywords}</TagsInput>

            <NumberInput name='turn_cycles' label='Turn cycles'>{data.turn_cycles}</NumberInput>

            <ButtonGroup name='settings' label='Settings' options='{conditions}' multiple='{true}'>
                {settings}
            </ButtonGroup>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, settings,
            conditions: composeEntityOptions(ent, 'conditions')
        },
    }, true);

    return result as BaseControl[];
};

