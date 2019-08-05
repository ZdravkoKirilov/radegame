import { GameEntity, Expression } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { composeCommonFormContext } from '../helpers';

export function composeExpressionForm(data: Expression, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const template = `
    <Form>
        <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>
        <TextInput name='description' label='Description'>{data.description}</TextInput>

        <TextInput name='code' label='Code'>{data.code}</TextInput>

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