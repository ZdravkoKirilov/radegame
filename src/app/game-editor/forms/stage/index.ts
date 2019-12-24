import { Stage, GameEntity } from '@app/game-mechanics';
import { BaseControl, parse, ConnectedEntities } from '@app/dynamic-forms';
import { baseTemplate, composeCommonFormContext, imageTemplate } from '../helpers';

export function composeStageForm(data: Stage, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const template = `
        <Form>
            ${baseTemplate}

            ${imageTemplate}

            <NumberInput name='width' label='Width' required='{true}'>{data.width}</NumberInput>

            <NumberInput name='height' label='Height' required='{true}'>{data.height}</NumberInput>

            <CodeEditor name="computed_slots" label="Get slots">
                {data.get_slots}
            </CodeEditor>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data as GameEntity, ent),
            data,
        },
    }, true);

    return result as BaseControl[];
}
