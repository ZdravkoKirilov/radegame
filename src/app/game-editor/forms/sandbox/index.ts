import { Sandbox, SandboxType } from '@app/game-mechanics';
import { BaseControl, parse, ConnectedEntities } from '@app/dynamic-forms';

import { baseTemplate, composeCommonFormContext, composeEntityOptions } from '../helpers';
import { toDictionary } from '@app/shared';

export const composeSandboxLimitedForm = (data: Sandbox, type: SandboxType): BaseControl[] => {
  data = data || {};

  const template = `
    <Form>
      <TextInput name='id' hidden='{true}'>{data.id}</TextInput>

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

export const composeSandboxForm = (data: Sandbox, entities: ConnectedEntities): BaseControl[] => {
  data = data || {};
  const node_options = Object.values(entities.widgets).reduce(
    (total, widget) => {
      const options = composeEntityOptions(widget.nodes, toDictionary(entities.images), 'images');
      return [...total, ...options];
    },
    []
  );

  const template = `
    <Form>
        <TextInput name='id' hidden='{true}'>{data.id}</TextInput>
        ${baseTemplate}

        <Dropdown name='widget' label='Widget' options='{widget_options}'>{data.widget}</Dropdown>
        <Dropdown name='node' label='Node' options='{node_options}'>{data.node}</Dropdown>
        <Dropdown name='module' label='Module' options='{module_options}'>{data.module}</Dropdown>

        <CodeEditor name='from_parent' label='From parent'>{data.from_parent}</CodeEditor>

        <CodeEditor name='on_init' label='On init'>{data.on_init}</CodeEditor>
  
        <CodeEditor name='global_state' label='Global state'>{data.global_state}</CodeEditor>
        <CodeEditor name='own_data' label='Own data'>{data.own_data}</CodeEditor>
  
        <CodeEditor name='preload' label='Load data'>{data.preload}</CodeEditor>
        <CodeEditor name='load_done' label='Is load done'>{data.load_done}</CodeEditor>

    </Form>
    `;

  const result = parse({
    source: template,
    context: {
      data,
      ...composeCommonFormContext(entities),
      node_options
    }
  }, true) as BaseControl[];

  return result;
};
