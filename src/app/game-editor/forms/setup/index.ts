import { Setup } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { composeCommonFormContext, baseTemplate } from '../helpers';

export const composeSetupForm = (data: Setup, ent: ConnectedEntities): BaseControl[] => {
    data = data || {};
    const rounds = data.rounds || [];

    const template = `
    <Form>

        ${baseTemplate}

        <NumberInput name='min_players' label='Min players'>{data.min_players}</NumberInput>

        <NumberInput name='max_players' label='Max players'>{data.max_players}</NumberInput>

        <TextInput name='recommended_age' label='Recommended age'>{data.recommended_age}</TextInput>

        <Group name='rounds' label='Rounds' children='{rounds}' item='@item' addButtonText='Add'>
            <Form>
                <NumberInput name='id' hidden='{true}'>{@item.id}</NumberInput>

                <Dropdown name='round' label='Round' options='{round_options}' required='{true}'>{@item.round}</Dropdown>

            </Form>
        </Group>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data, rounds,
        }
    }, true) as BaseControl[];

    return result;
};
