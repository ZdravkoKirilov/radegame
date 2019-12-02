import {
    BaseControl,
    FormDefinition, ConnectedEntities, parse
} from '@app/dynamic-forms';
import { Transition } from '@app/game-mechanics';
import { composeCommonFormContext } from '../helpers';

export const composeTransitionForm: FormDefinition = (data: Transition, ent?: ConnectedEntities) => {
    data = data || {};

    const template = `
    <Form>
        <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>
        <TextInput name='description' label='Description'>{data.description}</TextInput>

        <CodeEditor name='trigger' label='Trigger' required='{true}'>{data.trigger}</CodeEditor>

        <Dropdown name='sound' label='Sound' options='{sound_options}'>{data.sound}</Dropdown>
        <Dropdown name='animation' label='Animation' options='{animation_options}'>{data.animation}</Dropdown>

        <CodeEditor name='enabled' label='Enabled'>{data.enabled}</CodeEditor>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data,
        }
    }, true) as BaseControl[];

    return result;
};

