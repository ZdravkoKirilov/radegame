import { Style } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { baseTemplate, composeCommonFormContext } from '../helpers';

export function composeStyleForm(data: Style, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const template = `
    <Form>

        ${baseTemplate}

        <TextInput name='width' label='Width'>{data.width}</TextInput>
        <TextInput name='height' label='Height'>{data.height}</TextInput>
        <ColorPicker name='stroke_color' label='Stroke color'>{data.stroke_color}</ColorPicker>
        <NumberInput name='stroke_thickness' label='Stroke thickness'>{data.stroke_thickness}</NumberInput>

        <NumberInput name='frame' label='Frame'>{data.frame}</NumberInput>
        <NumberInput name='rotation' label='Rotate'>{data.rotation}</NumberInput>

        <NumberInput name='opacity' label='Opacity'>{data.opacity}</NumberInput>

        <Dropdown name='hidden' label='Hidden' options='{boolean_options}'>{data.hidden}</Dropdown>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data,
        }
    }, true) as BaseControl[];

    return result;
}