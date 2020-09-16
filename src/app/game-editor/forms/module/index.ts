import { Module } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import {
    baseTemplate, boardTemplate, composeCommonFormContext
} from '../helpers';

export function composeModuleForm(data: Module, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

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

    </Form>
`;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(ent),
            data
        },
    }, true);

    return result as BaseControl[];
}
