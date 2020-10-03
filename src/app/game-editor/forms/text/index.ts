import { Text, Translation } from '@app/game-mechanics';
import { BaseControl, ConnectedEntities, parse } from '@app/dynamic-forms';
import {
  composeCommonFormContext, baseTemplate, styleTemplate, composeInlineStyleFormContext
} from '../helpers';

export function composeTextForm(data: Text, ent: ConnectedEntities): BaseControl[] {
  data = data || {};

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
      data
    },
  }, true);

  return result as BaseControl[];
};

export function composeTextTranslationForm(data: Translation, ent: ConnectedEntities): BaseControl[] {
  data = data || {};

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
      data
    },
  }, true);

  return result as BaseControl[];
}