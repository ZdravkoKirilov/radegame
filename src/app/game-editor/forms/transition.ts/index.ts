import {
    BaseControl,
    FormDefinition, ConnectedEntities, parse
} from '@app/dynamic-forms';
import { Transition } from '@app/game-mechanics';
import { composeCommonFormContext, baseTemplate } from '../helpers';

export const composeTransitionForm: FormDefinition = (data: Transition, ent?: ConnectedEntities) => {
    data = data || {};

    const template = `
    <Form>
        ${baseTemplate}

        <CodeEditor name='trigger' label='Trigger' required='{true}'>{data.trigger}</CodeEditor>

        <CodeEditor name='sound' label='Sound'>{data.sound}</CodeEditor>

        <Dropdown name='animation' label='Animation' options='{animation_options}'>{data.animation}</Dropdown>

        <CodeEditor name='enabled' label='Enabled'>{data.enabled}</CodeEditor>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(ent),
            data,
        }
    }, true) as BaseControl[];

    return result;
};

