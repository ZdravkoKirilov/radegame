import { Style } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { composeEntityOptions } from '../helpers';

export function composeStyleForm(data: Style, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const template = `
    <Form>

        <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>
        <TextInput name='description' label='Description'>{data.description}</TextInput>
        <Dropdown name='image' label='Image' options='{images}' showImage='{true}'>{data.image}</Dropdown>

        <NumberInput name='frame' label='Frame'>{data.frame}</NumberInput>
        <NumberInput name='rotation' label='Rotate'>{data.rotation}</NumberInput>

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