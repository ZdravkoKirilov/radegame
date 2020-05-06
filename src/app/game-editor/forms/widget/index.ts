import { Widget, GameEntity } from '@app/game-mechanics';
import { BaseControl, parse, ConnectedEntities } from '@app/dynamic-forms';
import { baseTemplate, composeCommonFormContext, framesTemplate } from '../helpers';

export function composeWidgetForm(data: Widget, ent: ConnectedEntities): BaseControl[] {
    data = data || {};
    const frames = data.frames || [];

    const template = `
        <Form>
            ${baseTemplate}

            <NumberInput name='width' label='Width' required='{true}'>{data.width}</NumberInput>

            <NumberInput name='height' label='Height' required='{true}'>{data.height}</NumberInput>

            <CodeEditor name="slot_getter" label="Get slots via">
                {data.slot_getter}
            </CodeEditor>

            ${framesTemplate}

            <CodeEditor name="frame_getter" label="Get frame via">
                {data.frame_getter}
            </CodeEditor>

        </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data as GameEntity, ent),
            data, frames,
        },
    }, true);

    return result as BaseControl[];
}
