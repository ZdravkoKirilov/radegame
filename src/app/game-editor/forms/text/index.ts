import { Text, Translation } from '@app/game-mechanics';
import { BaseControl, FormDefinition, parse } from '@app/dynamic-forms';

import {
  composeCommonFormContext, baseTemplate, styleTemplate, composeInlineStyleFormContext
} from '../helpers';

export const composeTextForm: FormDefinition<Text> = (data, ent) => {

  const template = `
    <Form>

        ${baseTemplate}

        <TextInput name='default_value' label='Default value'>{data.default_value}</TextInput>

        ${styleTemplate}

    </Form>
    `;

  const result = parse({
    source: template,
    context: {
      ...composeCommonFormContext(ent),
      ...composeInlineStyleFormContext(ent),
      data: data || {}
    },
  }, true);

  return result as BaseControl[];
};

export const composeTextTranslationForm: FormDefinition<Translation> = (data, ent) => {

  const template = `
    <Form>

      <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>

      <TextInput name='value' required='{true}' label='Value'>{data.value}</TextInput>

      <Dropdown name='language' label='Language' options='{language_options}' showImage='{true}'>{data.language}</Dropdown>

    </Form>
    `;

  const result = parse({
    source: template,
    context: {
      ...composeCommonFormContext(ent),
      data: data || {}
    },
  }, true);

  return result as BaseControl[];
}