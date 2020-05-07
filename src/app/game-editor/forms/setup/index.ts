import { Setup } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { composeCommonFormContext, baseTemplate } from '../helpers';

export const composeSetupForm = (data: Setup, ent: ConnectedEntities): BaseControl[] => {
    data = data || {};

    const template = `
    <Form>

        ${baseTemplate}

        <NumberInput name='min_players' label='Min players'>{data.min_players}</NumberInput>

        <NumberInput name='max_players' label='Max players'>{data.max_players}</NumberInput>

        <TextInput name='recommended_age' label='Recommended age'>{data.recommended_age}</TextInput>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data
        }
    }, true) as BaseControl[];

    return result;
};
