import { GameEntity, Expression } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { composeCommonFormContext, baseTemplate } from '../helpers';

export function composeExpressionForm(data: Expression, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const template = `
    <Form>
        ${baseTemplate}

        <TextInput name='preload_as' label='Preload as'>{data.preload_as}</TextInput>

        <CodeEditor name='code' label='Code'>{data.code}</CodeEditor>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data as GameEntity, ent),
            data,
        }
    }, true) as BaseControl[];

    return result;
}