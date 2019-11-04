import { Style, FONT_STYLES } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import { baseTemplate, composeCommonFormContext, composeFromObject } from '../helpers';

export function composeStyleForm(data: Style, ent: ConnectedEntities, asInlineForm = false): BaseControl[] {
    data = data || {};

    const template = `
    <Form>

        ${asInlineForm ? '' : baseTemplate}

        <TextInput name='width' label='Width'>{data.width}</TextInput>
        <TextInput name='height' label='Height'>{data.height}</TextInput>
        <TextInput name='x' label='Left'>{data.x}</TextInput>
        <TextInput name='y' label='Top'>{data.y}</TextInput>

        <ColorPicker name='stroke_color' label='Stroke color'>{data.stroke_color}</ColorPicker>
        <TextInput name='stroke_thickness' label='Stroke thickness'>{data.stroke_thickness}</TextInput>
        <TextInput name='background_color' label='Background color'>{data.background_color}</TextInput>

        <TextInput name='rotation' label='Rotate'>{data.rotation}</TextInput>
        <TextInput name='opacity' label='Opacity'>{data.opacity}</TextInput>
        <TextInput name='skew' label='Skew'>{data.skew}</TextInput>
        <TextInput name='border_radius' label='Border radius'>{data.border_radius}</TextInput>

        <TextInput name='font_size' label='Font size'>{data.font_size}</TextInput>
        <TextInput name='font_family' label='font_family'>{data.font_family}</TextInput>
        <Dropdown name='font_style' label='Font style' options='{font_styles}'>
            {data.font_style}
        </Dropdown>

    </Form>
    `;

    const result = parse({
        source: template,
        context: {
            ...composeCommonFormContext(data, ent),
            data, font_styles: composeFromObject(FONT_STYLES)
        }
    }, true) as BaseControl[];

    return result;
};