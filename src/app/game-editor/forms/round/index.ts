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

                <Dropdown name='phase' label='Phase' options='{phase_options}' required='{true}'>{@item.phase}</Dropdown>

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
