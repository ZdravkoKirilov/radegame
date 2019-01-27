import { Stage } from '@app/game-mechanics';
import { BaseControl, parse } from '@app/dynamic-forms';
import { baseTemplate } from '../helpers';

export function composeStageForm(data: Stage = {}): BaseControl[] {
    data = data || {};

    const template = `
        <Form>
            ${baseTemplate}

            <NumberInput name='width' label='Width' defaultValue='{100}'>{data.width}</NumberInput>

            <NumberInput name='height' label='Height' defaultValue='{100}'>{data.height}</NumberInput>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data,
            images: composeEntityOptions(ent, 'images', ['thumbnail', 'svg']),
        },
    }, true);

    return result as BaseControl[];
}
