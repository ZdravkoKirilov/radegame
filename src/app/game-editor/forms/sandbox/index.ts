import { Sandbox } from '@app/game-mechanics';
import { BaseControl, FormDefinition, parse } from '@app/dynamic-forms';

import { baseTemplate } from '../helpers';

export const composeSandboxForm: FormDefinition<Sandbox> = (data) => {

  const template = `
    <Form>
      <TextInput name='id' hidden='{true}'>{data.id}</TextInput>
      ${baseTemplate}

      <CodeEditor name='from_parent' label='From parent'>{data.from_parent}</CodeEditor>

      <CodeEditor name='on_init' label='On init'>{data.on_init}</CodeEditor>

      <CodeEditor name='global_state' label='Global state'>{data.global_state}</CodeEditor>
      <CodeEditor name='own_data' label='Own data'>{data.own_data}</CodeEditor>

    </Form>
    `;

  const result = parse({
    source: template,
    context: {
      data: data || {}
    }
  }, true) as BaseControl[];

  return result;
};
