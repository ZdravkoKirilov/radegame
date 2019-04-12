import { Style } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { composeEntityOptions, baseTemplate } from '../helpers';

export function composeStyleForm(data: Style, ent: ConnectedEntities): BaseControl[] {
    data = data || {};
    const keywords = data.keywords || [];

    const template = `
    <Form>

        ${baseTemplate}

        <NumberInput name='frame' label='Frame'>{data.frame}</NumberInput>
        <NumberInput name='rotation' label='Rotate'>{data.rotation}</NumberInput>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data, keywords,
            images: composeEntityOptions(ent, 'images', ['thumbnail', 'svg']),
            keyword_options: composeEntityOptions(ent, 'keywords'),
        }
    }, true) as BaseControl[];

    return result;
}