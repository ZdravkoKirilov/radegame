import { Keyword } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { composeEntityOptions } from '../helpers';

export function composeStyleForm(data: Keyword, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const template = `
    <Form>

        <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>
        <TextInput name='display_name' label='Displayed name'>{data.display_name}</TextInput>
        <TextInput name='description' label='Description'>{data.description}</TextInput>
        <Dropdown name='image' label='Image' options='{images}' showImage='{true}'>{data.image}</Dropdown>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            data,
            images: composeEntityOptions(ent, 'images', ['thumbnail', 'svg']),
        }
    }, true) as BaseControl[];

    return result;
}