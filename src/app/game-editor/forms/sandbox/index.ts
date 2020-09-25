import { Sandbox, SandboxType } from '@app/game-mechanics';
import { BaseControl, parse } from '@app/dynamic-forms';

import { baseTemplate } from '../helpers';

export const composeSandboxForm = (data: Sandbox, type: SandboxType): BaseControl[] => {
  data = data || {};

  const template = `
    <Form>
      <TextInput name='id' hidden='{true}'>{data.id}</TextInput>
      ${baseTemplate}

      <CodeEditor name='from_parent' label='From parent' hidden='{${type === SandboxType.module}}'>{data.from_parent}</CodeEditor>

      <CodeEditor name='on_init' label='On init'>{data.on_init}</CodeEditor>

      <CodeEditor name='global_state' label='Global state'>{data.global_state}</CodeEditor>
      <CodeEditor name='own_data' label='Own data'>{data.own_data}</CodeEditor>

      <CodeEditor name='preload' label='Load data' hidden='{${type !== SandboxType.module}}'>{data.preload}</CodeEditor>
      <CodeEditor name='load_done' label='Is load done' hidden='{${type !== SandboxType.module}}'>{data.load_done}</CodeEditor>

    </Form>
    `;

  const result = parse({
    source: template,
    context: {
      data
    }
  }, true) as BaseControl[];

  return result;
};
