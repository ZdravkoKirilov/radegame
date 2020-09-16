import { Widget, GameEntity } from '@app/game-mechanics';
import { BaseControl, parse, ConnectedEntities } from '@app/dynamic-forms';

import {
    baseTemplate, composeCommonFormContext, framesTemplate, styleTemplate,
    composeInlineStyleFormContext
} from '../helpers';

export function composeWidgetForm(data: Widget, ent: ConnectedEntities): BaseControl[] {
    data = data || {};
    const frames = data.frames || [];

    const template = `
        <Form>
            ${baseTemplate}

            <CodeEditor name="render" label="Render">
                {data.render}
            </CodeEditor>

            ${styleTemplate}

            <CodeEditor name="node_getter" label="Create nodes">
                {data.node_getter}
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
            ...composeCommonFormContext(ent),
            ...composeInlineStyleFormContext(ent),
            data, frames,
        },
    }, true);

    return result as BaseControl[];
}
