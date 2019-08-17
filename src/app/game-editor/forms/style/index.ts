import { Style } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { baseTemplate, composeCommonFormContext } from '../helpers';

export function composeStyleForm(data: Style, ent: ConnectedEntities): BaseControl[] {
    data = data || {};

    const template = `
    <Form>

        ${baseTemplate}

        <NumberInput name='width' label='Width'>{data.width}</NumberInput>
        <NumberInput name='height' label='Height'>{data.height}</NumberInput>
        <ColorPicker name='strokeColor' label='Stroke color'>{data.strokeColor}</ColorPicker>
        <NumberInput name='strokeThickness' label='Stroke thickness'>{data.strokeThickness}</NumberInput>

        <NumberInput name='frame' label='Frame' defaultValue='{0}'>{data.frame}</NumberInput>
        <NumberInput name='rotation' label='Rotate' defaultValue='{0}'>{data.rotation}</NumberInput>

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