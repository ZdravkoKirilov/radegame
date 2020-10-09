import { Setup } from '@app/game-mechanics';
import { BaseControl, FormDefinition, parse } from '@app/dynamic-forms';

import { composeCommonFormContext, baseTemplate } from '../helpers';

export const composeSetupForm: FormDefinition<Setup> = (data, ent) => {

  const template = `
    <Form>

        ${baseTemplate}

        <Dropdown name='image' label='Image'>{data.image}</Dropdown>

        <NumberInput name='min_players' label='Min players'>{data.min_players}</NumberInput>

        <NumberInput name='max_players' label='Max players'>{data.max_players}</NumberInput>

        <TextInput name='recommended_age' label='Recommended age'>{data.recommended_age}</TextInput>

        <CodeEditor name='get_active_module' label='Get active module' required='{true}'>
            {data.get_active_module}
        </CodeEditor>

        <CodeEditor name='get_active_language' label='Get active language' required='{true}'>
            {data.get_active_language}
        </CodeEditor>

    </Form>
    `;

  const result = parse({
    source: template,
    context: {
      ...composeCommonFormContext(ent),
      data: data || {}
    }
  }, true) as BaseControl[];

  return result;
};
