import {
    BaseControl,
    FormDefinition, ConnectedEntities, parse
} from '@app/dynamic-forms';
import { Handler, GameEntity, HANDLER_TYPES } from '@app/game-mechanics';
import { composeCommonFormContext, composeFromObject } from '../helpers';

export const composeHandlerForm: FormDefinition = (data: Handler, ent?: ConnectedEntities) => {
    data = data || {};

    const template = `
    <Form>
        <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>
        <TextInput name='description' label='Description'>{data.description}</TextInput>

        <Dropdown name='type' label='Type' options='{types}'>{data.type}</Dropdown>

        <Dropdown name='state' label='State' options='{expression_options}'>{data.state}</Dropdown>
        <Dropdown name='effect' label='Effect' options='{expression_options}'>{data.effect}</Dropdown>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data as GameEntity, ent),
            data,
            types: composeFromObject(HANDLER_TYPES)
        }
    }, true) as BaseControl[];

    return result;
};

