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

        <Group name='phases' label='Phases' children='{phases}' item='@item' addButtonText='Add'>
            <Form>
                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <Dropdown name='phase' label='Phase' options='{phase_options}' required='{true}'>{@item.phase}</Dropdown>

                <Dropdown name='done' label='Done if' options='{expression_options}' required='{true}'>
                    {@item.done}
                </Dropdown>

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
