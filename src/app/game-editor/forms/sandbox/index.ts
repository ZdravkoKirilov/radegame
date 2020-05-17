import { Sandbox, SandboxType } from '@app/game-mechanics';
import { BaseControl, parse } from '@app/dynamic-forms';

import { baseTemplate } from '../helpers';

export const composeSandboxLimitedForm = (data: Sandbox, type: SandboxType): BaseControl[] => {
  data = data || {};

  const template = `
    <Form>
      <TextInput name='id' hidden='{true}'>{data.id}</TextInput>

      <CodeEditor name='global_state' label='Global state'>{data.global_state}</CodeEditor>
      <CodeEditor name='own_data' label='Own data'>{data.own_data}</CodeEditor>
      <CodeEditor name='on_init' label='On init'>{data.on_init}</CodeEditor>

      <CodeEditor name='load_data' label='Load data' hidden='{${type === SandboxType.module}}'>{data.load_data}</CodeEditor>
      <CodeEditor name='from_parent' label='From parent' hidden='{${type === SandboxType.module}}'>{data.from_parent}</CodeEditor>
      <CodeEditor name='from_node' label='From node' hidden='{${type === SandboxType.module}}'>{data.from_node}</CodeEditor>

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

export const composeSandboxForm = (data: Sandbox, type: SandboxType): BaseControl[] => {
  data = data || {};

  const template = `
    <Form>

        ${baseTemplate}

        <NumberInput name='min_players' label='Min players'>{data.min_players}</NumberInput>

        <NumberInput name='max_players' label='Max players'>{data.max_players}</NumberInput>

        <TextInput name='recommended_age' label='Recommended age'>{data.recommended_age}</TextInput>

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
