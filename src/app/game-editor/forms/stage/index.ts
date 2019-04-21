import { Stage } from '@app/game-mechanics';
import { BaseControl, parse, ConnectedEntities } from '@app/dynamic-forms';
import { baseTemplate, composeCommonFormContext } from '../helpers';

export function composeStageForm(data: Stage, ent: ConnectedEntities): BaseControl[] {
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
            ...composeCommonFormContext(ent, data),
            data,
        },
    }, true);

    return result as BaseControl[];
}
