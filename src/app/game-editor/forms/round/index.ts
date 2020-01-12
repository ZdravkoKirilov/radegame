import { Round } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import {
    baseTemplate, boardTemplate, composeCommonFormContext
} from '../helpers';

export function composeRoundForm(data: Round, ent: ConnectedEntities): BaseControl[] {
    data = data || {};
    const phases = data.phases || [];

    const template = `
    <Form>
        ${baseTemplate}
        ${boardTemplate}

        <CodeEditor name="preload" label="Preload">
            {data.preload}
        </CodeEditor>

        <CodeEditor name="load_done" label="Has loaded if">
            {data.load_done}
        </CodeEditor>

        <Group name='phases' label='Phases' children='{phases}' item='@item' addButtonText='Add'>
            <Form>
                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <TextInput name='name' required='{true}' label='Name'>{@item.name}</TextInput>
                <TextInput name='description' label='Description'>{@item.description}</TextInput>

                <CodeEditor name='done' label='Done if'>
                    {@item.done}
                </CodeEditor>

                <Dropdown name='image' label='Image' options='{image_options}' showImage='{true}'>{@item.image}</Dropdown>

            </Form>
        </Group>

    </Form>
`;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data, phases
        },
    }, true);

    return result as BaseControl[];
}
