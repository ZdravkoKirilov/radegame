import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { WidgetNode, NODE_LIFECYCLES, NodeHandler, NodeLifecycle } from "@app/game-mechanics";
import { RzEventTypes } from "@app/render-kit";

import {
  baseTemplate,
  boardTemplate,
  composeCommonFormContext,
  composeInlineStyleFormContext,
  composeFromObject,
  styleTemplate,
} from "../helpers";

export const composeNodeForm: FormDefinition = (data: WidgetNode, ent?: ConnectedEntities) => {
  data = data || {};

  const template = `
        <Form>
            ${baseTemplate}

            ${boardTemplate}

            <Dropdown name='shape' label='Shape' options='{shape_options}'>
                {data.shape}
            </Dropdown>

            <Dropdown name='module' label='Module' options='{module_options}'>
                {data.module}
            </Dropdown>

            <Dropdown name='token' label='Token' options='{token_options}'>
                {data.token}
            </Dropdown>

            <Dropdown name='display_text_inline' label='Display text' options='{text_options}'>
                {data.display_text_inline}
            </Dropdown>

            <CodeEditor name='display_text' label='Display text getter'>
                {data.display_text}
            </CodeEditor>

            ${styleTemplate}

            <CodeEditor name='provide_context' label='Provide context'>{data.provide_context}</CodeEditor>

            <CodeEditor name='consume_context' label='Consume context'>{data.consume_context}</CodeEditor>

            <CodeEditor name='pass_to_children' label='Pass to children'>{data.pass_to_children}</CodeEditor>

        </Form>
    `;

  const result = parse({
    source: template,
    context: {
      ...composeCommonFormContext(ent),
      ...composeInlineStyleFormContext(ent),
      data,
      entities: ent
    },
  }, true);

  return result as BaseControl[];
};

export const composeNodeHandlerForm: FormDefinition = (data: NodeHandler, ent?: ConnectedEntities) => {
  data = data || {} as NodeHandler;

  const template = `
 
    <Form>
        <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>

        <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>

        <Dropdown name='type' label='Type' options='{handlerTypes}'>{data.type}</Dropdown>

        <CodeEditor name='effect' label='Effect'>
            {data.effect}
        </CodeEditor>

        <CodeEditor name='sound' label='Sound'>
            {data.sound}
        </CodeEditor>

        <Dropdown name='static_sound' label='Static sound' options='{sonata_options}'>
            {data.static_sound}
        </Dropdown>
    </Form>
    `;

  const result = parse({
    source: template,
    context: {
      ...composeCommonFormContext(ent),
      ...composeInlineStyleFormContext(ent),
      handlerTypes: composeFromObject(RzEventTypes),
      data,
      entities: ent
    },
  }, true);

  return result as BaseControl[];
};

export const composeNodeLifecycleForm: FormDefinition = (data: NodeLifecycle, ent?: ConnectedEntities) => {
  data = data || {} as NodeLifecycle;

  const template = `

    <Form>
        <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>

        <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>

        <Dropdown name='type' label='Type' options='{lifecycleTypes}'>{data.type}</Dropdown>

        <CodeEditor name='effect' label='Effect'>
            {data.effect}
        </CodeEditor>

        <CodeEditor name='sound' label='Sound'>
            {data.sound}
        </CodeEditor>

        <Dropdown name='static_sound' label='Static sound' options='{sonata_options}'>
            {data.static_sound}
        </Dropdown>
    </Form>
    `;

  const result = parse({
    source: template,
    context: {
      ...composeCommonFormContext(ent),
      ...composeInlineStyleFormContext(ent),
      lifecycleTypes: composeFromObject(NODE_LIFECYCLES),
      data,
      entities: ent
    },
  }, true);

  return result as BaseControl[];
};
