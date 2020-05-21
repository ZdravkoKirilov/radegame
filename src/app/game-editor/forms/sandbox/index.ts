import { Sandbox, SandboxType } from '@app/game-mechanics';
import { BaseControl, parse } from '@app/dynamic-forms';

import { baseTemplate } from '../helpers';

export const composeSandboxLimitedForm = (data: Sandbox, type: SandboxType, canSwitchTypes = false): BaseControl[] => {
  data = data || {};

  const template = `
    <Form>
      <TextInput name='id' hidden='{true}'>{data.id}</TextInput>

      <TextInput name='widget' label='Widget' hidden='{${!canSwitchTypes}}'>{data.widget}</TextInput>
      <TextInput name='node' label='Node' readonly='{true}' hidden='{${!canSwitchTypes}}'>{data.node}</TextInput>
      <TextInput name='module' label='Module' readonly='{true}' hidden='{${!canSwitchTypes}}'>{data.module}</TextInput>

      <CodeEditor name='on_init' label='On init'>{data.on_init}</CodeEditor>

      <CodeEditor name='global_state' label='Global state'>{data.global_state}</CodeEditor>
      <CodeEditor name='own_data' label='Own data'>{data.own_data}</CodeEditor>

      <CodeEditor name='preload' label='Load data' hidden='{${type !== SandboxType.module}}'>{data.preload}</CodeEditor>
      <CodeEditor name='load_done' label='Is load done' hidden='{${type !== SandboxType.module}}'>{data.load_done}</CodeEditor>

      <CodeEditor name='from_parent' label='From parent' hidden='{${type === SandboxType.module}}'>{data.from_parent}</CodeEditor>

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
