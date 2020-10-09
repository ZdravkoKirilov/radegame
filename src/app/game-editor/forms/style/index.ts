import { Style } from '@app/game-mechanics';
import { BaseControl, FormDefinition, parse } from '@app/dynamic-forms';
import { FONT_STYLES } from '@app/render-kit';

import { baseTemplate, composeCommonFormContext, composeFromObject } from '../helpers';

export const composeStyleForm = (asInlineForm = false): FormDefinition<Style> => (data, ent) => {

  const template = `
    <Form>

        ${asInlineForm ? '' : baseTemplate}

        <TextInput name='width' label='Width'>{data.width}</TextInput>
        <TextInput name='height' label='Height'>{data.height}</TextInput>
        <TextInput name='x' label='Left'>{data.x}</TextInput>
        <TextInput name='y' label='Top'>{data.y}</TextInput>
        <NumberInput name='z' label='z'>{data.z}</NumberInput>

        <TextInput name='stroke_color' label='Stroke color'>{data.stroke_color}</TextInput>
        <TextInput name='stroke_thickness' label='Stroke thickness'>{data.stroke_thickness}</TextInput>
        <TextInput name='fill' label='Fill'>{data.fill}</TextInput>
        <TextInput name='tint' label='Tint'>{data.tint}</TextInput>

        <TextInput name='rotation' label='Rotate'>{data.rotation}</TextInput>
        <NumberInput name='opacity' label='Opacity'>{data.opacity}</NumberInput>
        <TextInput name='skew' label='Skew'>{data.skew}</TextInput>
        <TextInput name='scale' label='Scale'>{data.scale}</TextInput>
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
      ...composeCommonFormContext(ent),
      data: data || {}, font_styles: composeFromObject(FONT_STYLES)
    }
  }, true) as BaseControl[];

  return result;
};