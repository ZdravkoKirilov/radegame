import { FormDefinition, ConnectedEntities, BaseControl, parse } from "@app/dynamic-forms";
import { WidgetNode, NODE_LIFECYCLES, NodeHandler, NodeLifecycle } from "@app/game-mechanics";
import { RzEventTypes } from "@app/render-kit";

import {
  baseTemplate,
  composeCommonFormContext,
  composeInlineStyleFormContext,
  composeFromObject,
  styleTemplate,
} from "../helpers";

export const composeNodeForm: FormDefinition<WidgetNode> = (data, ent) => {

  const template = `
        <Form>
            ${baseTemplate}

            <Dropdown name='widget' label='Widget' options='{widget_options}'>
              {data.widget}
            </Dropdown>

            <Dropdown name='shape' label='Shape' options='{shape_options}'>
                {data.shape}
            </Dropdown>

            <Dropdown name='module' label='Module' options='{module_options}'>
                {data.module}
            </Dropdown>

            <Dropdown name='token' label='Token' options='{token_options}'>
                {data.token}
            </Dropdown>

            <Dropdown name='dynamic_text' label='Dynamic text' options='{text_options}'>
                {data.dynamic_text}
            </Dropdown>

            <CodeEditor name='text' label='Static text'>
                {data.text}
            </CodeEditor>

            <CodeEditor name='image' label='Image'>
                {data.image}
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
      data: data || {},
      entities: ent
    },
  }, true);

  return result as BaseControl[];
};

export const composeNodeHandlerForm: FormDefinition<NodeHandler> = (data, ent) => {

  const template = `
 
    <Form>
        <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>

        <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>

        <Dropdown name='type' label='Type' options='{handlerTypes}'>{data.type}</Dropdown>

        <CodeEditor name='effect' label='Effect'>
            {data.effect}
        </CodeEditor>

        <CodeEditor name='dynamic_sound' label='Dynamic sound'>
            {data.dynamic_sound}
        </CodeEditor>

        <Dropdown name='sound' label='Sound' options='{sonata_options}'>
            {data.sound}
        </Dropdown>
    </Form>
    `;

  const result = parse({
    source: template,
    context: {
      ...composeCommonFormContext(ent),
      ...composeInlineStyleFormContext(ent),
      handlerTypes: composeFromObject(RzEventTypes),
      data: data || {},
      entities: ent
    },
  }, true);

  return result as BaseControl[];
};

export const composeNodeLifecycleForm: FormDefinition<NodeLifecycle> = (data, ent) => {

  const template = `

    <Form>
        <NumberInput name='id' hidden='{true}'>{data.id}</NumberInput>

        <TextInput name='name' required='{true}' label='Name'>{data.name}</TextInput>

        <Dropdown name='type' label='Type' options='{lifecycleTypes}'>{data.type}</Dropdown>

        <CodeEditor name='effect' label='Effect'>
            {data.effect}
        </CodeEditor>

        <CodeEditor name='dynamic_sound' label='Dynamic sound'>
            {data.dynamic_sound}
        </CodeEditor>

        <Dropdown name='sound' label='Sound' options='{sonata_options}'>
            {data.sound}
        </Dropdown>
    </Form>
    `;

  const result = parse({
    source: template,
    context: {
      ...composeCommonFormContext(ent),
      ...composeInlineStyleFormContext(ent),
      lifecycleTypes: composeFromObject(NODE_LIFECYCLES),
      data: data || {},
      entities: ent
    },
  }, true);

  return result as BaseControl[];
};
